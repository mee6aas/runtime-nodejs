import * as path from "path";

import { expect, use } from "chai";
import * as chaiAsPromised from "chai-as-promised";

import app from "../src/app/main";
import * as mockServer from "./mock/server/index";

use(chaiAsPromised);

// tslint:disable: no-unused-expression

describe("app with the mock server", () => {

    describe("loads an activity", () => {

        before(() => {
            mockServer.serve();
        });

        after(() => {
            mockServer.stop();
        });

        it("with proper argument.", async () => {
            const handle = await app({
                api: { ACTIVITY_RESOURCE: path.resolve(__dirname) },
                entryPoint: "func",
                withCopy: false,
            });

            {
                const reported = mockServer.getReport();
                await mockServer.load("mock");
                const result = await reported;
                expect(result.getIserror()).to.equal(false);
            }

            handle.stop();
        });
    });

    describe("invokes an activity", () => {

        before(() => {
            mockServer.serve();
        });

        after(() => {
            mockServer.stop();
        });

        it("without argument and provide result.", async () => {
            const invokeID = "C-137";
            const handle = await app({
                api: { ACTIVITY_RESOURCE: path.resolve(__dirname) },
                entryPoint: "func",
                withCopy: false,
            });

            {
                const reported = mockServer.getReport();
                await mockServer.load("mock");
                const result = await reported;
                expect(result.getIserror()).to.equal(false);
            }

            {
                const reported = mockServer.getReport();
                await mockServer.invoke(invokeID);
                const result = await reported;

                expect({
                    id: result.getId(),
                    rst: result.getResult(),
                    isErr: result.getIserror(),
                }).to.deep.equal({
                    id: invokeID,
                    rst: "I'm Mr. Meeseeks, look at me!",
                    isErr: false,
                });
            }

            handle.stop();
        });

        it("and provides an error message when invocation throws an error.", async () => {
            const invokeID = "C-137";
            const handle = await app({
                api: { ACTIVITY_RESOURCE: path.resolve(__dirname) },
                entryPoint: "errFunc",
                withCopy: false,
            });

            {
                const reported = mockServer.getReport();
                await mockServer.load("mock");
                const result = await reported;
                expect(result.getIserror()).to.equal(false);
            }

            {
                const reported = mockServer.getReport();
                await mockServer.invoke(invokeID);
                const result = await reported;

                expect({
                    id: result.getId(),
                    isErr: result.getIserror(),
                }).to.deep.equal({
                    id: invokeID,
                    isErr: true,
                });

                expect(result.getResult()).to.include("Peace among worlds");
            }

            handle.stop();
        });

        it("with an argument.", async () => {
            const invokeID = "C-137";
            const arg = { want: "open Jerry's stupid mayonnaise jar" };
            const handle = await app({
                api: { ACTIVITY_RESOURCE: path.resolve(__dirname) },
                entryPoint: "echoFunc",
                withCopy: false,
            });

            {
                const reported = mockServer.getReport();
                await mockServer.load("mock");
                const result = await reported;
                expect(result.getIserror()).to.equal(false);
            }

            {
                const reported = mockServer.getReport();
                await mockServer.invoke(invokeID, arg);
                const result = await reported;

                expect({
                    id: result.getId(),
                    rst: JSON.parse(result.getResult()),
                    isErr: result.getIserror(),
                }).to.deep.equal({
                    id: invokeID,
                    rst: arg,
                    isErr: false,
                });
            }

            handle.stop();
        });
    });
});
