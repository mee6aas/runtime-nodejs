import { format, isError, isString, isUndefined, isNullOrUndefined, isNumber } from "util";

function serialize(val: any | undefined) {
    if (isString(val)) { return val; }
    if (isUndefined(val)) { return "undefined"; }
    if (isError(val)) { return format(val); }
    if (isNumber(val)) { return isNaN(val) ? "NaN" : val.toString() }

    try {
        return serialize(JSON.stringify(val));
    } catch (_) { }

    if (typeof val === "bigint") { return val.toString(); }

    if (isNullOrUndefined(val.toString)) {
        return "";
    } else {
        return val.toString();
    }
}

export {
    serialize
}