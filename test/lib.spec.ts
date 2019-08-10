import { expect, use } from "chai";
import * as chaiAsPromised from "chai-as-promised";

import * as utils from "../src/lib/utils";

use(chaiAsPromised);

describe("lib/utils", () => {
    it("serialize primitive types", () => {
        const testData: Array<Array<any>> = [
            [true, "true"],
            [false, "false"],
            [null, "null"],
            [undefined, "undefined"],
            [0, "0"],
            ["", ""],
            [Symbol(), "undefined"]
        ];

        for (const [i, o] of testData) {
            expect(utils.serialize(i)).to.equal(o)
        }
    })

    it("serialize string", () => {
        const testData: Array<Array<any>> = [
            ["", ""],
            ["rick", "rick"],
            [new String(), "\"\""],
            [new String("morty"), "\"morty\""],
        ];

        for (const [i, o] of testData) {
            expect(utils.serialize(i)).to.equal(o)
        }
    });

    it("serialize number", () => {
        const testData: Array<Array<any>> = [
            [-0, "0"],
            [3.14, "3.14"],
            [6.0221409e+23, "6.0221409e+23"],
            [BigInt(42), "42"],
            [NaN, "NaN"]
        ];

        for (const [i, o] of testData) {
            expect(utils.serialize(i)).to.equal(o)
        }
    })

    it("serialize Error", () => {
        const testData: Array<Array<any>> = [
            [new Error(), "Error"],
            [new Error("Jerry"), "Jerry"]
        ];

        for (const [i, o] of testData) {
            expect(utils.serialize(i)).to.include(o)
        }
    })

    it("serialize JSON", () => {
        const testData: Array<Array<any>> = [
            [
                [true, false, null, undefined, 0, "", Symbol()],
                "[true,false,null,null,0,\"\",null]"
            ],
            [
                { bool: true, arr: [6.0221409e+23], str: "smith", nested: { bool: true, arr: [6.0221409e+23] } },
                "{\"bool\":true,\"arr\":[6.0221409e+23],\"str\":\"smith\",\"nested\":{\"bool\":true,\"arr\":[6.0221409e+23]}}"
            ]
        ];

        for (const [i, o] of testData) {
            expect(utils.serialize(i)).to.equal(o)
        }
    })
});
