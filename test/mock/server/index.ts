import * as grpc from "grpc";

import * as invokeeSvc from "../../../src/lib/api/proto/invokee/v1/invokee_grpc_pb";
import * as invokeeMsg from "../../../src/lib/api/proto/invokee/v1/invokee_pb";

let server: grpc.Server;
const conns = new Map<string, grpc.ServerWriteableStream<invokeeMsg.Task>>();

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
    }

    conns.set(call.getPeer(), call);
    call.on("cancelled", () => { conns.delete(call.getPeer()); });
}

function serve(port = 50051, hostname = "0.0.0.0") {
    server = new grpc.Server();
    server.addService(invokeeSvc.InvokeeService, {
        listen,
    });

    server.bind(`${hostname}:${port}`, grpc.ServerCredentials.createInsecure());
    server.start();
}

function stop() { server.forceShutdown(); }

export {
    serve,
    stop,
};
