import { expect } from "chai";

import InvokeeClient from "../src/lib/InvokeeClient";
import * as mockServer from "./mock/server/index";

describe("InvokeeClient with the mock server", () => {
    const invokeeClient = new InvokeeClient();

    after(() => {
        mockServer.stop();
    });

    it("stops trying to connect to the server after given timeout", async () => {
        const timeout = 100;

        await expect(invokeeClient.connect(timeout)).eventually.be.rejected;
    });

    it("can connect to the server", async () => {
        mockServer.serve();

        await expect(invokeeClient.connect()).eventually.be.fulfilled;
    });

    it("fails if listen to the invokee service more than once", (done) => {
        const accepted = invokeeClient.listen();
        const refused = invokeeClient.listen();

        refused.on("data", () => {
            // ignore
        });
        refused.on("error", (err) => {
            accepted.cancel();

            expect(err).to.be.an("error");

            done();
        });
    });

    it("can close the connection to the invokee service", () => {
        expect(() => { invokeeClient.close(); }).to.not.throw();
    });
});
