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
    describe("create and destroy", () => {
        let invoker: Invoker;

        it("should fork worker process", async () => {
            expect(() => { invoker = new Invoker(); }).not.to.throw();
            expect(isRunning(invoker.pid)).to.be.true;
            await expect(invoker.ready()).to.eventually
                .be.fulfilled;
        });

        it("should be destroyed", () => {
            invoker.destroy();

            expect(isRunning(invoker.pid)).to.be.false;
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

        it("should fail when loading a module that can not be found", async () => {
            await expect(invoker.load("not exists")).to.eventually
                .be.rejectedWith(errors.NotFound);
        });

        it("should fail when loading a module that is not a function", async () => {
            await expect(invoker.load(path.resolve(__dirname, "./mock/notFunc"))).to.eventually
                .be.rejectedWith(errors.MethodNotAllowed);
        });

        it("should load moudle", async () => {
            await expect(invoker.load(path.resolve(__dirname, "./mock/func"))).to.eventually
                .be.fulfilled;
        });

        it("should fail when load twice", async () => {
            await expect(invoker.load(path.resolve(__dirname, "./mock/func"))
                .then(() => {
                    return invoker.load(path.resolve(__dirname, "./mock/func"));
                })).to.eventually
                .be.rejectedWith(errors.Forbidden);
        });

        it("should invoke a function", async () => {
            await invoker.load(path.resolve(__dirname, "./mock/func"));
            await expect(invoker.invoke()).to.eventually
                .be.fulfilled;
        });

        it(`should return "I'm Mr. Meeseeks, look at me!"`, async () => {
            await invoker.load(path.resolve(__dirname, "./mock/func"));
            await expect(invoker.invoke()).to.eventually
                .be.deep.equal({
                    isThrown: false,
                    result: JSON.stringify("I'm Mr. Meeseeks, look at me!"),
                });
        });

        it("should tolerance to error of function invokation and provide an error message", async () => {
            await invoker.load(path.resolve(__dirname, "./mock/errFunc"));
            await expect(invoker.invoke()).to.eventually
                .be.include({ isThrown: true })
                .and.have.property("result").that.is.include("Peace among worlds");
        });

        it("should fail when invoking destroyed Invoker", async () => {
            invoker.destroy();
            await expect(invoker.invoke()).to.eventually
                .be.rejectedWith(errors.BadRequest);
        });
    });

    describe("new invoker vs cached invoker", () => {
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
