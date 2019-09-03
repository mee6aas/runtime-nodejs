import * as path from "path";

import * as fse from "fs-extra";

import API from "../lib/api/common";
import * as invokeeMsg from "../lib/api/proto/invokee/v1/invokee_pb";
import InvokeeClient from "../lib/InvokeeClient";
import Invoker from "../lib/Invoker";
import * as utils from "../lib/utils";

interface IAppOpt {
    api: any;
    entryPoint: string; // for debug
    withCopy: boolean; // for debug // TODO: is it need to update tests to invoke copied function?
}

const dftOpt: IAppOpt = {
    api: API,
    entryPoint: "main",
    withCopy: true,
};

async function main(opt: IAppOpt = dftOpt) {
    const invokeeClient = new InvokeeClient();
    await invokeeClient.connect().catch((err) => {
        throw err;
    });
    console.log("Connected to the agent");

    const invoker = new Invoker();

    let taskHandler = async (task: invokeeMsg.Task) => {
        if (task.getType() !== invokeeMsg.TaskType.LOAD) {
            throw new Error("First Task must be type LOAD");
        }

        let trg = path.resolve(opt.api.ACTIVITY_RESOURCE, task.getArg());

        if (opt.withCopy) {
            await fse.copy(trg, trg = "./act");
        }

        trg = path.resolve(trg, opt.entryPoint);

        invoker.load(trg);

        taskHandler = async (t: invokeeMsg.Task) => {
            const input = utils.serialize(t.getArg());

            await invoker.invoke(input).then((rst) => {
                invokeeClient.report(t, utils.serialize(rst), false);
            }, (err) => {
                invokeeClient.report(t, utils.serialize(err), true);
            });
        };

        invokeeClient.report(task, "", false).then((_) => { }, (err) => {
            throw err;
        });
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
