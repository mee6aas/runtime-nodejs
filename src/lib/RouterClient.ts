import * as grpc from "grpc";
import * as RouterService from "./api/proto/v1/router_grpc_pb";
import * as routerMsg from "./api/proto/v1/router_pb";

class RouterClient {
    private _client: RouterService.RouterServiceClient;

    public async connect(timeout = 1000 * 60) {
        this._client = new RouterService.RouterServiceClient(
            `${
            process.env.ZEEP_HOST || "0.0.0.0"
            }:${
            process.env.ZEEP_PORT || 50051
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
        const req = new routerMsg.ListenRequest();

        return this._client.listen(req);
    }

    public async send(data: string) {
        const req = new routerMsg.SendRequest();
        req.setBody(data);

        return new Promise<routerMsg.SendResponse>((resolve, reject) => {
            this._client.send(req, (
                err: grpc.ServiceError,
                res: routerMsg.SendResponse,
            ) => {
                if (err) { reject(err); }
                resolve(res);
            });
        });
    }

}

export default RouterClient;
