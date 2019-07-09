if (require.main !== module) {
    throw new Error("Do not import this file");
}

import * as CODE from "http-status-codes";
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

process.once("message", (trg) => {
    let task;

    try {
        task = require(trg);
    } catch (e) {
        if (e.code === "MODULE_NOT_FOUND") {
            _send(new Message(CODE.NOT_FOUND, "module not found"));
        } else {
            _send(OK);
        }
        process.exit(1);
    }

    if (typeof task !== "function") {
        _send(new Message(CODE.BAD_REQUEST, "Not a function"));
        process.exit(1);
    } else {
        _send(OK);
    }

    // TODO: make message to Message
    process.on("message", task.constructor.name === "AsyncFunction"
        ? (msg) => {
            task(msg).then((rst) => {
                // @ts-ignore:2722
                process.send(JSON.stringify(rst) || "");
            });
        }
        : (msg) => {
            const rst = task(msg);
            // @ts-ignore:2722
            process.send(JSON.stringify(rst) || "");
        },
    );
});
