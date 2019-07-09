import * as routerMsg from "../lib/api/proto/v1/router_pb";
import RouterClient from "../lib/RouterClient";

async function main() {
    const routerClient = new RouterClient();

    await routerClient.connect();

    const stream = routerClient.listen();
    stream.on("data", (data: routerMsg.Message) => {
        console.log(data); // tslint:disable-line no-console
    });

}

main();
