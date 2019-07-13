import * as invokeeMsg from "../lib/api/proto/invokee/v1/invokee_pb";
import InvokeeClient from "../lib/InvokeeClient";

async function main() {
    const routerClient = new InvokeeClient();

    await routerClient.connect();

    const stream = routerClient.listen();
    stream.on("data", (data: invokeeMsg.Task) => {
        console.log(data); // tslint:disable-line no-console
    });

}

main();
