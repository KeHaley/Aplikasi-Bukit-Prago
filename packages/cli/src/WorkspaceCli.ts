import { WorkspaceService } from "@bpv4/workspace";

export class WorkspaceCli {

    private readonly workspace: WorkspaceService;

    constructor() {

        this.workspace = new WorkspaceService();

    }

    version(): string {

        return this.workspace.getWorkspaceVersion();

    }

    status() {

        return this.workspace.getWorkspaceSummary();

    }

    health() {

        return {
            healthy: this.workspace.isHealthy(),
            running: this.workspace.isRunning(),
            bootstrapped: this.workspace.isBootstrapped()
        };

    }

    getWorkspaceName(): string {

        return this.workspace.getWorkspaceName();

    }

    getWorkspaceVersion(): string {

        return this.workspace.getWorkspaceVersion();

    }

    getWorkspaceSummary() {

        return this.workspace.getWorkspaceSummary();

    }

    start(): void {

        this.workspace.start();

    }

    stop(): void {

        this.workspace.stop();

    }

    isRunning(): boolean {

        return this.workspace.isRunning();

    }

}