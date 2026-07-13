import { ApplicationShell } from "../ApplicationShell.js";
import { RuntimeState } from "./RuntimeState.js";

export class Runtime {

    private readonly shell: ApplicationShell;

    private state = RuntimeState.Created;

    constructor(
        shell = new ApplicationShell()
    ) {

        this.shell = shell;

    }

    initialize(): void {

        if (this.state !== RuntimeState.Created) {

            return;

        }

        this.shell.initialize();

        this.state = RuntimeState.Initialized;

    }

    start(): void {

        if (this.state === RuntimeState.Running) {

            return;

        }

        this.initialize();

        this.shell.start();

        this.state = RuntimeState.Running;

    }

    stop(): void {

        if (this.state !== RuntimeState.Running) {

            return;

        }

        this.shell.stop();

        this.state = RuntimeState.Stopped;

    }

    dispose(): void {

        if (this.state === RuntimeState.Disposed) {

            return;

        }

        this.shell.dispose();

        this.state = RuntimeState.Disposed;

    }

    getState(): RuntimeState {

        return this.state;

    }

    getShell(): ApplicationShell {

        return this.shell;

    }

}