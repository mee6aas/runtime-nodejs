import { expect } from 'chai'
import * as grpc from 'grpc'

import * as mockServer from '../mock/server/index'

import { RouterServiceClient } from '../lib/api/proto/v1/router_grpc_pb';
import * as routerMsg from '../lib/api/proto/v1/router_pb';

describe('listen router service', () => {
    let stream: grpc.ClientReadableStream<routerMsg.Message>
    let client = new RouterServiceClient(
        `${
        process.env.ZEEP_HOST || '0.0.0.0'
        }:${
        process.env.ZEEP_PORT || 50051
        }`,
        grpc.credentials.createInsecure()
    );

    before(async ()=>{
        mockServer.serve()
    })

    after(() => {
        client.close()
        mockServer.stop()
    })

    it('connect to server', () => {
        let req = new routerMsg.ListenRequest();
        stream = client.listen(req);
    })

    it('should returned hello with peer information', (done) => {
        stream.on("data", (msg) => {
            expect(msg.getBody().split(' ')).contain('hello')
            done()
        })
    })
})
