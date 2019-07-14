import * as path from "path";

import { expect, use } from "chai";
import * as chaiAsPromised from "chai-as-promised";

import app from "../src/app/main";
import * as mockServer from "./mock/server/index";

use(chaiAsPromised);

// tslint:disable: no-unused-expression

describe("app with the mock server", () => {

    beforeEach(() => {
        mockServer.serve();
    });

    afterEach(() => {
        mockServer.stop();
    });

    it("invokes an activity", async () => {
        const invokeID = "C-137";
        const handle = await app({
            api: { ACTIVITY_RESOURCE: path.resolve(__dirname, "./mock") },
            entryPoint: "func",
        });

        const reported = mockServer.getReport();
        await mockServer.invoke(invokeID);
        const result = await reported;

        expect({
            id: result.getId(),
            rst: JSON.parse(result.getResult()),
        }).to.be.deep.equal({
            id: invokeID,
            rst: "I'm Mr. Meeseeks, look at me!",
        });

        handle.stop();
    });
});
