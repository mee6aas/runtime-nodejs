import { isNumber, isString } from "util";

import * as errors from "http-errors";

class Message {
    public static createString(code: number, info: string = "") {
        return (new Message(code, info)).toString();
    }

    public static parse(json: string) {
        const msg = JSON.parse(json);
        const code = isNumber(msg.code) ? msg.code : 0;
        const info = isString(msg.info) ? msg.info : "";
        return new Message(code, info);
    }
    public code: number;
    public info: string;

    constructor(code: number, info: string) {
        this.code = code;
        this.info = info;
    }

    public toString() {
        return JSON.stringify({
            code: this.code,
            info: this.info,
        });
    }

    public toError(info?: string) {
        if (this.code < 300) { return null; }
        return new errors[this.code](info ? info : this.info);
    }
}

export default Message;
