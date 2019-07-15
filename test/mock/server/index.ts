import { EventEmitter } from "events";

import * as grpc from "grpc";

import * as invokeeSvc from "../../../src/lib/api/proto/invokee/v1/invokee_grpc_pb";
import * as invokeeMsg from "../../../src/lib/api/proto/invokee/v1/invokee_pb";
import utils from "../../../src/lib/utils";

let server: grpc.Server;
const serverEvent = new EventEmitter();
const conns = new Map<string, grpc.ServerWriteableStream<invokeeMsg.Task>>();
let lastInvoke: EventEmitter | undefined;

function onListen() {
    return new Promise((resolve) => {
        serverEvent.on("listen", (conn) => { resolve(conn); });
    });
}

function listen(
    call: grpc.ServerWriteableStream<invokeeMsg.Task>,
) {
    if (conns.has(call.getPeer())) {
        const err: grpc.ServiceError = {
            name: "unavailable",
            message: "already connected by other client in the same host",
            code: grpc.status.UNAVAILABLE,
        };

        call.emit("error", err);
        return;
    }

    conns.set(call.getPeer(), call);
    call.on("cancelled", () => { conns.delete(call.getPeer()); });

    serverEvent.emit("listen", call);
}

function report(
    req: grpc.ServerUnaryCall<invokeeMsg.ReportRequest>,
    cb: grpc.requestCallback<invokeeMsg.ReportResponse>,
) {
    if (lastInvoke === undefined) { throw new Error("call getReport fists"); }

    const res = new invokeeMsg.ReportResponse();

    lastInvoke.emit("report", req.request);

    cb(null, res);
}

function serve(port = 50051, hostname = "0.0.0.0") {
    server = new grpc.Server();
    server.addService(invokeeSvc.InvokeeService, {
        listen,
        report,
    });

    server.bind(`${hostname}:${port}`, grpc.ServerCredentials.createInsecure());
    server.start();
}

function getReport() {
    lastInvoke = new EventEmitter();
    return new Promise<invokeeMsg.ReportRequest>((resolve) => {
        if (lastInvoke === undefined) { throw new Error("call getReport first"); }

        lastInvoke.once("report", (rst) => {
            resolve(rst);
        });
    });
}

function invoke(id: string, arg?: any) {
    if (lastInvoke === undefined) { throw new Error("call getReport first"); }

    return onListen().then((conn: grpc.ServerWriteableStream<invokeeMsg.Task>) => {
        const task = new invokeeMsg.Task();
        task.setId(id);
        task.setArg(utils.serialize(arg));

        return new Promise((resolve, reject) => {
            conn.write(task, (err) => { err ? reject(err) : resolve(); });
        });
    });
}

function stop() {
    server.forceShutdown();
}

export {
    serve,
    invoke,
    getReport,
    stop,
};
