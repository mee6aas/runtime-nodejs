import { format, isString } from "util";

function serialize(val: any | undefined) {
    if (val === undefined) { return ""; }
    if (val instanceof Error) { return format(val); }

    let json: string;

    try {
        json = JSON.stringify(val);
    } catch {
        json = "";
    }

    return json;
}

function tryDeserialize(val: string | undefined) {
    if (val === undefined) { return undefined; }
    if (val === "") { return undefined; }

    let obj: any;

    try {
        obj = JSON.parse(val);
    } catch {
        isString(val)
            ? obj = val
            : obj = null;
    }

    return obj;
}

export default {
    serialize,
    tryDeserialize,
};
