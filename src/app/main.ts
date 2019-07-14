import * as path from "path";

import API from "../lib/api/common";
import * as invokeeMsg from "../lib/api/proto/invokee/v1/invokee_pb";
import InvokeeClient from "../lib/InvokeeClient";
import Invoker from "../lib/Invoker";
import utils from "../lib/utils";

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
    await invokeeClient.connect();

    const invoker = new Invoker();

    let taskHandler = (task: invokeeMsg.Task) => {

        const handler = (t: invokeeMsg.Task) => {
            const input = utils.tryDeserialize(t.getArg());
            invoker.invoke(input).then((rst) => {
                const output = utils.trySerialize(rst);

                return invokeeClient.report(t, output === null ? "" : output, false);
            }, (err) => {
                const output = utils.trySerialize(err);

                return invokeeClient.report(t, output === null ? "" : output, true);
            });
        };

        invoker.load(path.join(opt.api.ACTIVITY_RESOURCE, opt.entryPoint));
        taskHandler = handler;
        handler(task);
    };

    const stream = invokeeClient.listen();
    stream.on("data", taskHandler);
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
