import { WorkspaceService } from "@bpv4/workspace";

import { CommandRegistry } from "./CommandRegistry.js";
import { ModuleRegistry } from "./ModuleRegistry.js";
import { ServiceContainer } from "./ServiceContainer.js";
import { Workbench } from "./Workbench.js";
import { WorkspaceSessionManager } from "./WorkspaceSessionManager.js";

export class ApplicationShell {

    private readonly workspace: WorkspaceService;

    private readonly services: ServiceContainer;

    private readonly modules: ModuleRegistry;

    private readonly commands: CommandRegistry;

    private readonly workbench: Workbench;

    private readonly sessionManager: WorkspaceSessionManager;

    private initialized = false;

    private running = false;

    private disposed = false;

    constructor() {

        this.workspace = new WorkspaceService();

        this.services = new ServiceContainer();

        this.modules = new ModuleRegistry();

        this.commands = new CommandRegistry();

        this.workbench = new Workbench();

        this.sessionManager = new WorkspaceSessionManager();

    }

    initialize(): void {

        if (this.initialized) {

            return;

        }

        this.workbench.initialize();

        this.workspace.bootstrap();

        this.initialized = true;

    }
captureWorkspace(): void {

    const explorer =
        this.workbench.getProjectExplorer();

    if (!explorer) {

        return;

    }

    this.sessionManager.captureExplorer(
        explorer
    );

}
restoreWorkspace(): void {

    const explorer =
        this.workbench.getProjectExplorer();

    if (!explorer) {

        return;

    }

    this.sessionManager.restoreExplorer(
        explorer
    );

}
    start(): void {

        if (this.running) {

            return;

        }

        this.initialize();

        this.workspace.start();

        this.running = true;

    }

    stop(): void {

        if (!this.running) {

            return;

        }

        this.workbench.dispose();

        this.workspace.stop();

        this.running = false;

    }

    dispose(): void {

        if (this.disposed) {

            return;

        }

        this.stop();

        this.services.clear();

        this.modules.clear();

        this.commands.clear();

        this.disposed = true;

    }

    isInitialized(): boolean {

        return this.initialized;

    }

    isRunning(): boolean {

        return this.running;

    }

    isDisposed(): boolean {

        return this.disposed;

    }

    getWorkbench(): Workbench {

        return this.workbench;

    }

    getWorkspace(): WorkspaceService {

        return this.workspace;

    }

    getWorkspaceSessionManager(): WorkspaceSessionManager {

        return this.sessionManager;

    }

    getServices(): ServiceContainer {

        return this.services;

    }

    getModules(): ModuleRegistry {

        return this.modules;

    }

    getCommands(): CommandRegistry {

        return this.commands;

    }

}