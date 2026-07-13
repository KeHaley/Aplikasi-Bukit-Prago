export class WorkspaceConfiguration {

    readonly workspaceName: string;

    readonly workspaceVersion: string;

    readonly environment: string;

    constructor(
        workspaceName = "BPV4 Workspace",
        workspaceVersion = "1.0.0",
        environment = "production"
    ) {

        this.workspaceName = workspaceName;
        this.workspaceVersion = workspaceVersion;
        this.environment = environment;

    }

}