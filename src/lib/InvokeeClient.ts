import * as grpc from "grpc";
import * as invokeeSvc from "./api/proto/invokee/v1/invokee_grpc_pb";
import * as invokeeMsg from "./api/proto/invokee/v1/invokee_pb";

class InvokeeClient {
    private _client: invokeeSvc.InvokeeClient;

    public async connect(timeout = 1000 * 60) {
        this._client = new invokeeSvc.InvokeeClient(
            `${
            process.env.AGENT_HOST || "0.0.0.0"
            }:${
            process.env.AGENT_PORT || 50051
            }`,
            grpc.credentials.createInsecure(),
        );

        return new Promise<void>((resolve, reject) => {
            this._client.waitForReady(Date.now() + timeout, (err) => {
                if (err) { reject(err); }
                resolve();
            });
        });
    }

    public close() { return this._client.close(); }

    public listen() {
        const req = new invokeeMsg.ListenRequest();

        return this._client.listen(req);
    }
}

export default InvokeeClient;
