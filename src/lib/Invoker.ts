import * as errors from "http-errors";

class Invoker {
    private task: (any?) => any;

    public load(trg: string) {
        let task: any;

        try {
            task = require(trg);
        } catch (e) {
            if (e.code === "MODULE_NOT_FOUND") {
                throw new errors.NotFound(`Failed to load ${trg}`);
            }

            throw e;
        }

        if (typeof task !== "function") {
            throw new errors.MethodNotAllowed(`Not a function`);
        }

        this.task = task;
    }

    public invoke(input?: any) {
        let rst: any;

        return new Promise((resolve, reject) => {
            try {
                rst = this.task(input);
            } catch (e) {
                reject(e);
                return;
            }

            if (!(rst instanceof Promise)) {
                resolve(rst);
                return;
            }

            rst.then((r) => {
                resolve(r);
                return;
            }, (e) => {
                reject(e);
                return;
            });
        });
    }
}

export default Invoker;
