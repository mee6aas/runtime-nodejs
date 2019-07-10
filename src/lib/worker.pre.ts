if (require.main !== module) {
    throw new Error("Do not import this file");
}

import * as CODE from "http-status-codes";
import { tryDeserialize, trySerialize } from "./util.pre";
import Message from "./workerMessage.pre";

const OK = Message.createString(CODE.OK);

process.send = process.send || (() => { throw new Error("Do not execute this file directly"); });
process.send(OK);

function _send(message: string | Message) {
    let msg: string;

    if (message instanceof Message) {
        msg = message.toString();
    } else {
        msg = message;
    }

    // @ts-ignore:2722
    process.send(msg);
}

function handleResult(rst: any) {
    const json = trySerialize(rst);

    if (json === null) {
        _send(new Message(CODE.RESET_CONTENT, "Not a JSON"));
        return;
    }

    _send(new Message(CODE.OK, json));
    return;
}

process.once("message", (trg) => {
    let task: any;

    try {
        task = require(trg);
    } catch (e) {
        if (e.code === "MODULE_NOT_FOUND") {
            _send(new Message(CODE.NOT_FOUND, "Module not found"));
        } else {
            _send(new Message(CODE.INTERNAL_SERVER_ERROR, e.message));
        }
        process.exit(1);
    }

    if (typeof task !== "function") {
        _send(new Message(CODE.METHOD_NOT_ALLOWED, "Not a function"));
        process.exit(1);
    }

    _send(OK);

    process.on("message", (msg: string) => {
        let rst: any;
        const input = tryDeserialize(msg);

        if (input === null) {
            _send(new Message(CODE.BAD_REQUEST, "Input must be serialized JSON string"));
            return;
        }

        try {
            rst = task(input);
        } catch (e) {
            _send(new Message(CODE.RESET_CONTENT, e.stack));
            return;
        }

        if (!(rst instanceof Promise)) {
            handleResult(rst);
            return;
        }

        rst.then((r) => {
            handleResult(r);
            return;
        }, (e) => {
            _send(new Message(CODE.RESET_CONTENT, e.stack));
            return;
        });
    });
});
