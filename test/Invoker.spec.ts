import * as path from "path";

import { expect, use } from "chai";
import * as chaiAsPromised from "chai-as-promised";
import * as errors from "http-errors";

import Invoker from "../src/lib/Invoker";

use(chaiAsPromised);

// tslint:disable: no-unused-expression

describe("Invoker", () => {
    describe("loads an activity", () => {
        let invoker: Invoker;

        beforeEach(() => {
            invoker = new Invoker();
        });

        it("that is valid.", () => {
            expect(() => { invoker.load(path.resolve(__dirname, "./mock/func")); })
                .to.not.throw();
        });

        it("but fail if the activity that can not be found.", () => {
            expect(() => { invoker.load("not exists"); })
                .to.throw(errors.NotFound);
        });

        it("but fail if the activity is not a function.", () => {
            expect(() => { invoker.load(path.resolve(__dirname, "./mock/notFunc")); })
                .to.throw(errors.MethodNotAllowed);
        });
    });

    describe("invokes an activity", () => {
        let invoker: Invoker;

        beforeEach(() => {
            invoker = new Invoker();
        });

        it("without argument and provide result.", async () => {
            await invoker.load(path.resolve(__dirname, "./mock/func"));
            await expect(invoker.invoke()).to.eventually
                .be.deep.equal("I'm Mr. Meeseeks, look at me!");
        });

        it("and provides an error message when invocation throws an error.", async () => {
            await invoker.load(path.resolve(__dirname, "./mock/errFunc"));
            await expect(invoker.invoke()).to.eventually
                .be.rejected.and.have.property("message")
                .that.equals("Peace among worlds");
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
