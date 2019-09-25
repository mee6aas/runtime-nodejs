import * as path from "path";

import * as fse from "fs-extra";

import API from "../lib/api/common";
import * as invokeeMsg from "../lib/api/proto/invokee/v1/invokee_pb";
import InvokeeClient from "../lib/InvokeeClient";
import Invoker from "../lib/Invoker";
import * as utils from "../lib/utils";

// TODO: WHAT A SHIT CODE
const AGENT_ADDR = `${
    process.env.AGENT_HOST || "0.0.0.0"
    }:${
    process.env.AGENT_PORT || 5122
    }`;

let isHandovered = false;
let untilHandovered: Promise<void>;

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
    let invokeeClient = new InvokeeClient();
    await invokeeClient.connect(AGENT_ADDR).catch((err) => {
        throw err;
    });
    console.log("Connected to the agent");

    const invoker = new Invoker();

    let taskHandler = ((orgInvokeeClient: InvokeeClient) => {
        return async (task: invokeeMsg.Task) => {
            if (task.getType() !== invokeeMsg.TaskType.LOAD) {
                throw new Error("First Task must be type LOAD");
            }

            console.log(`LOAD received`);

            taskHandler = async (t: invokeeMsg.Task) => {
                const type = t.getType();
                if (type === invokeeMsg.TaskType.HANDOVER) {
                    taskHandler = handoverHandler;
                    isHandovered = true;
                    untilHandovered = handoverHandler(t);
                } else if (type === invokeeMsg.TaskType.INVOKE) {
                    taskHandler = invokeHandler;
                    invokeHandler(t);
                } else {
                    throw new Error(`Expected task HANDOVER or INVOKE but ${type.toString()}`);
                }
            };

            let trg = path.resolve(opt.api.ACTIVITY_RESOURCE, task.getArg());

            if (opt.withCopy) {
                await fse.copy(trg, trg = "./act");
            }

            trg = path.resolve(trg, opt.entryPoint);

            invoker.load(trg);

            if (isHandovered) {
                await untilHandovered;
            }

            orgInvokeeClient.report(task, "", false).then((_) => { }, (err) => {
                throw err;
            });
        };
    })(invokeeClient);

    const invokeHandler = async (t: invokeeMsg.Task) => {
        if (t.getType() !== invokeeMsg.TaskType.INVOKE) {
            throw new Error(`Expected the task INVOKE but ${t.getType()}`);
        }

        const input = utils.serialize(t.getArg());

        await invoker.invoke(input).then((rst) => {
            invokeeClient.report(t, utils.serialize(rst), false);
        }, (err) => {
            invokeeClient.report(t, utils.serialize(err), true);
        });
    };

    const handoverHandler = async (t: invokeeMsg.Task) => {
        const addr = t.getArg();

        console.log(`handover to ${addr}`);

        // change connect(timeout)->stream to connect(addr, timout)->void
        // the stream should be managed in the client.
        invokeeClient = new InvokeeClient();
        await invokeeClient.connect(addr).catch((err) => {
            throw err;
        });
        stream = invokeeClient.listen();
        stream.on("data", (t) => { taskHandler(t); });
        stream.on("error", () => {
            // TODO: handle
        });

        taskHandler = invokeHandler;
    };

    let stream = invokeeClient.listen();
    stream.on("data", (t: invokeeMsg.Task) => {
        taskHandler(t);
    });
    stream.on("error", (err) => {
        // TODO: handle
        console.log("disconnected", err);
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
