import { expect, use } from "chai";
import * as chaiAsPromised from "chai-as-promised";
import * as isRunning from "is-running";
import * as path from "path";

import Invoker from "../lib/Invoker";

use(chaiAsPromised);

// tslint:disable: no-unused-expression

// TODO: test to see what error occurred.

describe("Invoker", () => {
    let invoker: Invoker;

    describe("create and destory", () => {
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
        beforeEach(() => {
            invoker = new Invoker();
        });

        afterEach(() => {
            invoker.destroy();
        });

        it("should fail when loading a module that can not be found", async () => {
            await expect(invoker.load("not exists")).to.eventually
                .be.rejected;
        });

        it("should fail when loading a module that is not a function", async () => {
            await expect(invoker.load("notFunc")).to.eventually
                .be.rejected;
        });

        it("should load moudle", async () => {
            await expect(invoker.load(path.resolve(__dirname, "./func"))).to.eventually
                .be.fulfilled;
        });

        it("should fail when load twice", async () => {
            await expect(invoker.load(path.resolve(__dirname, "./func"))
                .then(() => {
                    return invoker.load(path.resolve(__dirname, "./func"));
                })).to.eventually
                .be.rejected;
        });

        it("should invoke a function", async () => {
            await invoker.load(path.resolve(__dirname, "./func"));
            await expect(invoker.invoke()).to.eventually
                .be.fulfilled;
        });

        it(`should return "I'm Mr. Meeseeks, look at me!"`, async () => {
            await invoker.load(path.resolve(__dirname, "./func"));
            await expect(invoker.invoke()).to.eventually
                .be.equals(JSON.stringify("I'm Mr. Meeseeks, look at me!"));
        });

        it("should fail when invoking destroyed Invoker", async () => {
            invoker.destroy();
            await expect(invoker.invoke()).to.eventually
                .be.rejected;
        });
    });
});
