import { expect } from 'chai'
import * as grpc from 'grpc'

import * as mockServer from '../mock/server/index'

import RouterClient from '../lib/RouterClient'
import * as routerMsg from '../lib/api/proto/v1/router_pb'

describe('Router client with the mock server', () => {
    let routerClient = new RouterClient()

    after(() => {
        mockServer.stop()
    })

    it('should failed to connect to the router server after timeout', async () => {
        const timeout = 100

        try {
            await routerClient.connect(timeout)
        } catch (e) {
            expect(e).to.be.an('error')
        }
    })

    it('should connect to the router server', async () => {
        mockServer.serve()

        await routerClient.connect()
    })

    it('should send and receive a message to/from the router server', (done) => {
        const data = 'Hello'

        mockServer.enableEchoMode()
        let stream = routerClient.listen()
        stream.on('error', (err: grpc.ServiceError) => {
            if (err.code === grpc.status.CANCELLED) return
            throw err
        })
        stream.once('data', (msg: routerMsg.Message) => {
            stream.cancel()
            stream.destroy()

            const body = msg.getBody()

            expect(body).to.be.equal(data)

            done()
        })
        routerClient.send(data)
    })

    it('should not be listen to the router server more than once', (done) => {
        let accepted = routerClient.listen()
        let refused = routerClient.listen()

        refused.on('data', () => { })
        refused.on('error', (err) => {
            accepted.cancel()

            expect(err).to.be.an('error')

            done()
        })
    })

    it('should close the connection to the router server', () => {
        routerClient.close()
    })
})
