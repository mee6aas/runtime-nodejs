import * as path from "path";

import { expect, use } from "chai";
import * as chaiAsPromised from "chai-as-promised";
import * as errors from "http-errors";

import Invoker from "../src/lib/Invoker";

use(chaiAsPromised);

// tslint:disable: no-unused-expression

// TODO: test to see what error occurred.

describe("Invoker", () => {
    describe("loads a function", () => {
        let invoker: Invoker;

        beforeEach(() => {
            invoker = new Invoker();
        });

        it("that is valid.", () => {
            expect(() => { invoker.load(path.resolve(__dirname, "./mock/func")); })
                .to.not.throw();
        });

        it("but fail if the function that can not be found.", () => {
            expect(() => { invoker.load("not exists"); })
                .to.throw(errors.NotFound);
        });

        it("but fail if the function is not a function.", () => {
            expect(() => { invoker.load(path.resolve(__dirname, "./mock/notFunc")); })
                .to.throw(errors.MethodNotAllowed);
        });
    });

    describe("invokes a function", () => {
        let invoker: Invoker;

        beforeEach(() => {
            invoker = new Invoker();
        });

        it("without argument.", async () => {
            await invoker.load(path.resolve(__dirname, "./mock/func"));
            await expect(invoker.invoke()).to.eventually
                .be.fulfilled;
        });

        it(`then provide a result.`, async () => {
            await invoker.load(path.resolve(__dirname, "./mock/func"));
            await expect(invoker.invoke()).to.eventually
                .be.deep.equal("I'm Mr. Meeseeks, look at me!");
        });

        it("and provides an error message when invocation throws an error.", async () => {
            await invoker.load(path.resolve(__dirname, "./mock/errFunc"));
            await expect(invoker.invoke()).to.eventually
                .be.not.rejected;
        });

        it("with an argument.", async () => {
            const arg = { want: "be popular at school" };

            await invoker.load(path.resolve(__dirname, "./mock/echoFunc"));
            await expect(invoker.invoke(arg)).to.eventually
                .be.have.property("want").that.equals(arg.want);
        });

        it("that returns Promise.", async () => {
            const arg = { want: "be a more complete woman" };

            await invoker.load(path.resolve(__dirname, "./mock/echoPromiseFunc"));
            await expect(invoker.invoke(arg)).to.eventually
                .be.have.property("want").that.equals(arg.want);
        });

        it("that is async.", async () => {
            const arg = { want: "two strokes off" };

            await invoker.load(path.resolve(__dirname, "./mock/echoAsyncFunc"));
            await expect(invoker.invoke(arg)).to.eventually
                .be.have.property("want").that.equals(arg.want);
        });
    });
});
