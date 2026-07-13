import { ApplicationShell } from "./ApplicationShell.js";
import { StudioContext } from "./StudioContext.js";

export class Studio {

    private readonly shell: ApplicationShell;

    private readonly context: StudioContext;

    constructor() {

        this.shell = new ApplicationShell();

        this.context = new StudioContext(

            this.shell.getWorkbench()

        );

    }

    initialize(): void {

        this.shell.initialize();

    }

    getContext(): StudioContext {

        return this.context;

    }

    getShell(): ApplicationShell {

        return this.shell;

    }

    getWorkbench() {

        return this.shell.getWorkbench();

    }

    isInitialized(): boolean {

        return this.shell
            .getWorkbench()
            .isInitialized();

    }

}