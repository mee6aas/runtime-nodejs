import { EventEmitter } from "events";

import * as grpc from "grpc";

import * as invokeeSvc from "../../../src/lib/api/proto/invokee/v1/invokee_grpc_pb";
import * as invokeeMsg from "../../../src/lib/api/proto/invokee/v1/invokee_pb";
import * as utils from "../../../src/lib/utils";

let server: grpc.Server;
const serverEvent = new EventEmitter();
const conns = new Map<string, grpc.ServerWriteableStream<invokeeMsg.Task>>();
let lastInvoke: EventEmitter | undefined;

function afterListen() {
    return new Promise((resolve) => {
        if (conns.size > 0) {
            resolve(conns.entries().next().value[1]);
            return;
        }

        serverEvent.on("listen", (conn) => {
            resolve(conn);
        });
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

function serve(port = 5122, hostname = "0.0.0.0") {
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

function assignTask(conn: grpc.ServerWriteableStream<invokeeMsg.Task>, task: invokeeMsg.Task) {
    return new Promise((resolve, reject) => {
        conn.write(task, (err) => { err ? reject(err) : resolve(); });
    });
}

function load(arg: string) {
    if (lastInvoke === undefined) { throw new Error("call getReport first"); }

    return afterListen().then(async (conn: grpc.ServerWriteableStream<invokeeMsg.Task>) => {
        const load = new invokeeMsg.Task();
        load.setType(invokeeMsg.TaskType.LOAD);
        load.setId("."); // without resource ID
        load.setArg(arg);

        await assignTask(conn, load);
    });
}

function invoke(id: string, arg?: any) {
    if (lastInvoke === undefined) { throw new Error("call getReport first"); }

    return afterListen().then(async (conn: grpc.ServerWriteableStream<invokeeMsg.Task>) => {
        const task = new invokeeMsg.Task();
        task.setType(invokeeMsg.TaskType.INVOKE);
        task.setId(id);
        task.setArg(utils.serialize(arg));

        return assignTask(conn, task);
    });
}

function stop() {
    server.forceShutdown();
}

export {
    serve,
    invoke,
    load,
    getReport,
    stop,
};
