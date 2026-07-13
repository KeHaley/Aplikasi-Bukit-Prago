import { Workspace } from "./Workspace.js";

export class WorkspaceEngine {

    private readonly workspace: Workspace;

    constructor() {

        this.workspace = new Workspace();

    }

    getWorkspace(): Workspace {

        return this.workspace;

    }

}