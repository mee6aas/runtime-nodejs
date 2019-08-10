import * as path from "path";

import API from "../lib/api/common";
import * as invokeeMsg from "../lib/api/proto/invokee/v1/invokee_pb";
import InvokeeClient from "../lib/InvokeeClient";
import Invoker from "../lib/Invoker";
import * as utils from "../lib/utils";

interface IAppOpt {
    api: any;
    entryPoint: string; // for debug
}

const dftOpt: IAppOpt = {
    api: API,
    entryPoint: "main",
};

async function main(opt: IAppOpt = dftOpt) {
    const invokeeClient = new InvokeeClient();
    await invokeeClient.connect().catch((err) => {
        throw err;
    });

    const invoker = new Invoker();

    let taskHandler = (task: invokeeMsg.Task) => {
        if (task.getType() !== invokeeMsg.TaskType.LOAD) {
            throw new Error("First Task must be type LOAD");
        }

        invoker.load(path.resolve(opt.api.ACTIVITY_RESOURCE, task.getArg(), opt.entryPoint));

        taskHandler = (t: invokeeMsg.Task) => {
            const input = utils.serialize(t.getArg());
            invoker.invoke(input).then((rst) => {
                return invokeeClient.report(t, utils.serialize(rst), false);
            }, (err) => {
                return invokeeClient.report(t, utils.serialize(err), true);
            });
        };

        invokeeClient.report(task, "", false).then(_ => { }, err => {
            throw err
        })
    };

    const stream = invokeeClient.listen();
    stream.on("data", (t) => { taskHandler(t); });
    stream.on("error", () => {
        // TODO: handle
    });

    return {
        stop: () => {
            stream.cancel();
            invokeeClient.close();
        },
    };
}

export default main;

if (require.main === module) {
    main();
}
