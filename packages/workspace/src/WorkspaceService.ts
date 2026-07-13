import { WorkspaceService as CoreWorkspaceService } from "@bpv4/core";

import { WorkspaceConfiguration } from "./WorkspaceConfiguration.js";
import { WorkspaceRuntime } from "./WorkspaceRuntime.js";

export class WorkspaceService {

    private readonly runtime: WorkspaceRuntime;

    private readonly core: CoreWorkspaceService;

    constructor() {

        this.runtime = new WorkspaceRuntime();

        this.core = new CoreWorkspaceService(
            this.runtime.engine,
            this.runtime.projectManager
        );

    }

    bootstrap(): void {

        this.runtime.bootstrap();

    }

    isBootstrapped(): boolean {

        return this.runtime.isBootstrapped();

    }

    start(): void {

        this.runtime.start();

    }

    stop(): void {

        this.runtime.stop();

    }

    isRunning(): boolean {

        return this.runtime.isRunning();

    }

    getConfiguration(): WorkspaceConfiguration {

        return this.runtime.configuration;

    }

    registerModule(
        name: string,
        module: unknown
    ): void {

        this.runtime.registerModule(name, module);

    }

    hasModule(name: string): boolean {

        return this.runtime.hasModule(name);

    }

    getModule<T>(name: string): T | undefined {

        return this.runtime.getModule<T>(name);

    }

    getModuleNames(): string[] {

        return this.runtime.getModuleNames();

    }

    getHealthStatus() {

        return {
            ...this.runtime.getHealthStatus(),
            healthy: this.isHealthy()
        };

    }

    getWorkspaceName(): string {

        return this.core.getWorkspaceName();

    }

    getWorkspaceVersion(): string {

        return this.core.getWorkspaceVersion();

    }

    getWorkspaceSummary() {

        return {
            ...this.core.getWorkspaceSummary(),
            configuration: this.getConfiguration(),
            ...this.getHealthStatus(),
            modules: this.getModuleNames()
        };

    }

    getProjectManager() {

        return this.core.getProjectManager();

    }

    validate(): boolean {

        return this.core.validate();

    }

    isHealthy(): boolean {

        return this.core.isHealthy();

    }

    getRuntime(): WorkspaceRuntime {

        return this.runtime;

    }

}