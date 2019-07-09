import * as grpc from "grpc";

import * as routerSvc from "../../../src/lib/api/proto/v1/router_grpc_pb";
import * as routerMsg from "../../../src/lib/api/proto/v1/router_pb";

let isEchoMode = false;
let server: grpc.Server;
const conns = new Map<string, grpc.ServerWriteableStream<routerMsg.Message>>();

function listen(
    call: grpc.ServerWriteableStream<routerMsg.Message>,
) {
    if (conns.has(call.getPeer())) {
        const err: grpc.ServiceError = {
            name: "unavailable",
            message: "already connected by other client in the same host",
            code: grpc.status.UNAVAILABLE,
        };

        call.emit("error", err);
    }

    conns.set(call.getPeer(), call);
    call.on("cancelled", () => { conns.delete(call.getPeer()); });
}

function send(
    call: grpc.ServerUnaryCall<routerMsg.SendRequest>,
    callback: grpc.requestCallback<routerMsg.SendResponse>,
) {
    const res = new routerMsg.SendResponse();
    let conn: grpc.ServerWriteableStream<routerMsg.Message> | undefined;

    if (isEchoMode) {
        conn = conns.get(call.getPeer());
    } else {
        throw new Error("not implemented");
    }

    if (conn === undefined) {
        callback({
            name: "not found",
            message: "the destination is not found",
            code: grpc.status.NOT_FOUND,
        });
        return;
    }

    if (isEchoMode) {
        const msg = new routerMsg.Message();
        msg.setBody(call.request.getBody());

        conn.write(msg);
        callback(null, res);
        return;
    }

    callback({
        name: "unimplemented",
        message: "this service is not implemented",
        code: grpc.status.UNIMPLEMENTED,
    });
}

function serve(port = 50051, hostname = "0.0.0.0") {
    server = new grpc.Server();
    server.addService(routerSvc.RouterServiceService, {
        listen,
        send,
    });

    server.bind(`${hostname}:${port}`, grpc.ServerCredentials.createInsecure());
    server.start();
}

function stop() { server.forceShutdown(); }

function enableEchoMode() { isEchoMode = true; }
function disableEchoMode() { isEchoMode = false; }

export {
    serve,
    stop,
    enableEchoMode,
    disableEchoMode,
};
