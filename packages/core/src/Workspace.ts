import { WORKSPACE_NAME, WORKSPACE_VERSION } from "./WorkspaceVersion.js";

export class Workspace {

    readonly name: string;

    readonly version: string;

    constructor() {

        this.name = WORKSPACE_NAME;
        this.version = WORKSPACE_VERSION;

    }

}