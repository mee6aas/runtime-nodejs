import * as grpc from "grpc";
import * as invokeeSvc from "./api/proto/invokee/v1/invokee_grpc_pb";
import * as invokeeMsg from "./api/proto/invokee/v1/invokee_pb";

class InvokeeClient {
    private _client: invokeeSvc.InvokeeClient;

    public async connect(addr: string, timeout = 1000 * 60) {
        console.log(`trying connect to ${addr}`);
        this._client = new invokeeSvc.InvokeeClient(
            addr,
            grpc.credentials.createInsecure(),
        );

        return new Promise<void>((resolve, reject) => {
            this._client.waitForReady(Date.now() + timeout, (err) => {
                err ? reject(err) : resolve();
            });
        });
    }

    public close() { return this._client.close(); }

    public listen() {
        const req = new invokeeMsg.ListenRequest();

        return this._client.listen(req);
    }

    public report(task: invokeeMsg.Task, result: string, isError: boolean) {
        const req = new invokeeMsg.ReportRequest();
        req.setId(task.getId());
        req.setResult(result);
        req.setIserror(isError);

        return new Promise((resolve, reject) => {
            this._client.report(req, (err, res) => {
                err ? reject(err) : resolve(res);
            });
        });
    }
}

export default InvokeeClient;
