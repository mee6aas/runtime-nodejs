function trySerialize(val: any | undefined) {
    if (val === undefined) { return ""; }

    let json: string | null;

    try {
        json = JSON.stringify(val);
    } catch {
        json = null;
    }

    return json;
}

function tryDeserialize(val: string | undefined) {
    if (val === undefined) { return undefined; }
    if (val === "") { return undefined; }

    let obj: object | null;

    try {
        obj = JSON.parse(val);
    } catch {
        obj = null;
    }

    return obj;
}

export {
    trySerialize,
    tryDeserialize,
};
