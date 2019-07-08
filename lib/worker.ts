if (require.main !== module) {
    throw new Error("Do not import this file");
}

const errExcutedDirectly = new Error("Do not execute this file directly");

process.send = process.send || (() => { throw errExcutedDirectly; });
process.send("ACK");

process.once("message", (trg) => {
    let task;

    try {
        task = require(trg);
    } catch (e) {
        // @ts-ignore:2722
        process.send(e);
        process.exit(1);
    }

    if (typeof task !== "function") {
        // @ts-ignore:2722
        process.send(new Error("Not a function"));
        process.exit(1);
    } else {
        // @ts-ignore:2722
        process.send("ACK");
    }

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
