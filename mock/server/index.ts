import *  as grpc from 'grpc'

import * as routerMsg from '../../lib/api/proto/v1/router_pb'
import * as routerSvc from '../../lib/api/proto/v1/router_grpc_pb'

let server: grpc.Server

function listen(call: grpc.ServerWriteableStream<routerMsg.Message>) {
    let res = new routerMsg.Message()
    res.setBody('hello ' + call.getPeer())
    call.write(res)
    call.end()
}

function send() {

}

function serve(port = 50051, hostname = '0.0.0.0') {
    server = new grpc.Server();
    server.addService(routerSvc.RouterServiceService, {
        listen: listen,
        send: send
    })

    server.bind(`${hostname}:${port}`, grpc.ServerCredentials.createInsecure())
    server.start()
}

function stop(){
    server.forceShutdown()
}

export {
    serve,
    stop
}
