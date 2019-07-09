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

    // TODO: make message to Message
    process.on("message", task.constructor.name === "AsyncFunction"
        ? (msg) => {
            task(msg).then((rst) => {
                _send(new Message(CODE.OK, JSON.stringify(rst)));
            }, (err) => {
                _send(new Message(CODE.RESET_CONTENT, err.stack));
            });
        }
        : (msg) => {
            try {
                const rst = task(msg);
                _send(new Message(CODE.OK, JSON.stringify(rst)));
            } catch (err) {
                _send(new Message(CODE.RESET_CONTENT, err.stack));
            }
        },
    );
});
