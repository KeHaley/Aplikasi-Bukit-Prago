import { WorkspaceContext } from "./WorkspaceContext.js";
import { WorkspaceState } from "./WorkspaceState.js";

export class WorkspaceSession {

    private readonly context: WorkspaceContext;

    private state: WorkspaceState;

    constructor(context: WorkspaceContext) {

        this.context = context;
        this.state = WorkspaceState.Ready;

    }

    getContext(): WorkspaceContext {

        return this.context;

    }

    getState(): WorkspaceState {

        return this.state;

    }

    isReady(): boolean {

        return this.state === WorkspaceState.Ready;

    }

}