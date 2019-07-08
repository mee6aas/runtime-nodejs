import { ChildProcess, fork } from "child_process";
import * as path from "path";

class Invoker {
    public readonly pid: number;

    private _worker: ChildProcess;
    private _ready: Promise<void>;
    private _isloaded = false;
    private _isRunning = false;
    private _isDestroyed = false;

    private _rejectInit: ((any) => void) | undefined;

    constructor(timeout = 1000) {
        const proc = fork(path.join(__dirname, "worker.ts"), [], {
            // stdio: "ignore",
        });

        this.pid = proc.pid;

        proc.on("disconnect", () => { this.destroy(); });
        proc.on("exit", () => { this.destroy(); });
        proc.on("err", () => { this.destroy(); });

        this._ready = new Promise((resolve, reject) => {
            let isRejected = false;

            this._rejectInit = () => {
                if (isRejected) { return; }
                isRejected = true;
                reject("canceled");
            };
            proc.once("message", (msg) => {
                if (msg !== "ACK") {
                    reject(new Error("Failed to ready"));
                    return;
                }
                resolve();
            });
            setTimeout(() => {
                if (isRejected) { return; }
                isRejected = true;
                reject(new Error(`Timeout of ${timeout}ms exceeded to initiate Invoker`));
            }, timeout);
        });
        this._ready.catch(() => { this.destroy(); });
        this._worker = proc;
    }

    public isRunning() { return this._isRunning; }
    public isDestroyed() { return this._isDestroyed; }
    public ready() { return this._ready; }

    public load(trg: string) {
        return this._checkAvailable().then(() => {
            return new Promise<void>((resolve, reject) => {
                if (this._isloaded) {
                    reject(new Error("Already loaded"));
                    return;
                }

                this._isloaded = true;

                this._worker.once("message", (msg: string | Error) => {
                    if (msg !== "ACK") {
                        reject(msg);
                        return;
                    }
                    resolve();
                });

                this._worker.send(trg);
            });
        });
    }

    public invoke(trg: string = "") {
        return this._checkAvailable().then(() => {
            return new Promise<string>((resolve, reject) => {
                if (this._isRunning) {
                    reject(new Error("Already running"));
                    return;
                }

                this._isRunning = true;

                this._worker.send(path.resolve(trg));
                this._worker.once("message", (msg) => {
                    resolve(msg);
                });

                this._rejectInit = reject;
            }).finally(() => {
                this._isRunning = false;
                this._rejectInit = undefined;
            });
        });
    }

    public destroy() {
        if (this._isDestroyed) { return; }
        this._isDestroyed = true;

        if (this._worker === undefined) {
            return;
        }

        if (this._rejectInit !== undefined) {
            this._rejectInit("Destroyed");
        }

        this._worker.kill("SIGKILL");

        return;
    }

    private _checkDestroyed() {
        return new Promise((resolve, reject) => {
            if (this._isDestroyed) {
                reject(new Error("Destroyed Invoker"));
                return;
            }
            resolve();
        });
    }

    private _checkAvailable() {
        return this._ready.then(() => {
            return this._checkDestroyed();
        });
    }
}

export default Invoker;
