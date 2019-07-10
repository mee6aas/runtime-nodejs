import * as path from "path";

import { expect, use } from "chai";
import * as chaiAsPromised from "chai-as-promised";
import * as errors from "http-errors";
import * as isRunning from "is-running";

import Invoker from "../src/lib/Invoker";

use(chaiAsPromised);

// tslint:disable: no-unused-expression

// TODO: test to see what error occurred.

describe("Invoker", () => {
    describe("manage worker", () => {
        let invoker: Invoker;

        it("by forking worker process", async () => {
            expect(() => { invoker = new Invoker(); }).not.to.throw();
            expect(isRunning(invoker.pid)).to.be.true;
            await expect(invoker.ready()).to.eventually
                .be.fulfilled;
        });

        it("by destroying worker process", () => {
            invoker.destroy();

            expect(isRunning(invoker.pid)).to.be.false;
        });
    });

    describe("load a function", () => {
        let invoker: Invoker;

        beforeEach(() => {
            invoker = new Invoker();
        });

        afterEach(() => {
            invoker.destroy();
        });

        it("that is valid", async () => {
            await expect(invoker.load(path.resolve(__dirname, "./mock/func"))).to.eventually
                .be.fulfilled;
        });

        it("but fail if the function that can not be found", async () => {
            await expect(invoker.load("not exists")).to.eventually
                .be.rejectedWith(errors.NotFound);
        });

        it("but fail if the function is not a function", async () => {
            await expect(invoker.load(path.resolve(__dirname, "./mock/notFunc"))).to.eventually
                .be.rejectedWith(errors.MethodNotAllowed);
        });

        it("but fail when trying to load using an Invoker that already loaded a function", async () => {
            await expect(invoker.load(path.resolve(__dirname, "./mock/func"))
                .then(() => {
                    return invoker.load(path.resolve(__dirname, "./mock/func"));
                })).to.eventually
                .be.rejectedWith(errors.Forbidden);
        });
    });

    describe("invoke a function", () => {
        let invoker: Invoker;

        beforeEach(() => {
            invoker = new Invoker();
        });

        afterEach(() => {
            invoker.destroy();
        });

        it("without argument", async () => {
            await invoker.load(path.resolve(__dirname, "./mock/func"));
            await expect(invoker.invoke()).to.eventually
                .be.fulfilled;
        });

        it(`then provide a result`, async () => {
            await invoker.load(path.resolve(__dirname, "./mock/func"));
            await expect(invoker.invoke()).to.eventually
                .be.deep.equal({
                    isThrown: false,
                    result: JSON.stringify("I'm Mr. Meeseeks, look at me!"),
                });
        });

        it("provide an error message when function throws error", async () => {
            await invoker.load(path.resolve(__dirname, "./mock/errFunc"));
            await expect(invoker.invoke()).to.eventually
                .be.include({ isThrown: true })
                .and.have.property("result")
                .that.is.include("Peace among worlds");
        });

        it("with an argument", async () => {
            const arg = {
                want: "be popular at school",
            };

            await invoker.load(path.resolve(__dirname, "./mock/echoFunc"));
            await expect(invoker.invoke(arg)).to.eventually
                .be.include({ isThrown: false })
                .and.have.property("result")
                .that.equals(JSON.stringify(arg));
        });

        it("that returns Promise", async () => {
            const arg = {
                want: "be a more complete woman",
            };

            await invoker.load(path.resolve(__dirname, "./mock/echoPromiseFunc"));
            await expect(invoker.invoke(arg)).to.eventually
                .be.include({ isThrown: false })
                .and.have.property("result")
                .that.equals(JSON.stringify(arg));
        });

        it("that is async", async () => {
            const arg = {
                want: "two strokes off",
            };

            await invoker.load(path.resolve(__dirname, "./mock/echoAsyncFunc"));
            await expect(invoker.invoke(arg)).to.eventually
                .be.include({ isThrown: false })
                .and.have.property("result")
                .that.equals(JSON.stringify(arg));
        });

        it("but fail when the invoker is destroyed", async () => {
            invoker.destroy();
            await expect(invoker.invoke()).to.eventually
                .be.rejectedWith(errors.BadRequest);
        });
    });

    describe("that is already load function is more faster than that is not loaded", () => {
        let invoker: Invoker;

        after(() => {
            invoker.destroy();
        });

        it("create a new invoker and invoke", async () => {
            invoker = new Invoker();
            await invoker.load(path.resolve(__dirname, "./mock/func"));
            await invoker.invoke();
        });

        it("invoke with the cached invoker", async () => {
            await invoker.invoke();
        });
    });
});
