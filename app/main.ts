import * as routerMsg from '../lib/api/proto/v1/router_pb'
import RouterClient from "../lib/RouterClient"

async function main() {
    let routerClient = new RouterClient()

    await routerClient.connect()

    let stream = routerClient.listen()
    stream.on('data', (data: routerMsg.Message)=>{
        console.log(data)
    })
}

main()
