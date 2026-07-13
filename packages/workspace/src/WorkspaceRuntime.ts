import { WorkspaceEngine } from "@bpv4/core";
import { ProjectManager } from "@bpv4/project";

import { WorkspaceConfiguration } from "./WorkspaceConfiguration.js";

import { WorkspaceKnowledgeProvider } from "./runtime/WorkspaceKnowledgeProvider.js";
import { WorkspaceDocumentProvider } from "./runtime/WorkspaceDocumentProvider.js";
import { WorkspaceProjectProvider } from "./runtime/WorkspaceProjectProvider.js";

export class WorkspaceRuntime {

    readonly engine: WorkspaceEngine;

    readonly projectManager: ProjectManager;

    readonly configuration: WorkspaceConfiguration;

    readonly knowledgeProvider: WorkspaceKnowledgeProvider;

    readonly documentProvider: WorkspaceDocumentProvider;

    readonly projectProvider: WorkspaceProjectProvider;

    private readonly modules: Map<string, unknown>;

    private running: boolean;

    private bootstrapped: boolean;

    constructor() {

        this.engine = new WorkspaceEngine();

        this.projectManager = new ProjectManager();

        this.configuration = new WorkspaceConfiguration();

        this.knowledgeProvider =
            new WorkspaceKnowledgeProvider();

        this.documentProvider =
            new WorkspaceDocumentProvider();

        this.projectProvider =
            new WorkspaceProjectProvider();

        this.modules = new Map();

        this.running = false;

        this.bootstrapped = false;

    }

    bootstrap(): void {

        if (this.bootstrapped) {

            return;

        }

        this.bootstrapped = true;

    }

    isBootstrapped(): boolean {

        return this.bootstrapped;

    }

    start(): void {

        this.bootstrap();

        this.running = true;

    }

    stop(): void {

        this.running = false;

    }

    isRunning(): boolean {

        return this.running;

    }

    registerModule(

        name: string,

        module: unknown

    ): void {

        this.modules.set(

            name,

            module

        );

    }

    hasModule(

        name: string

    ): boolean {

        return this.modules.has(

            name

        );

    }

    getModule<T>(

        name: string

    ): T | undefined {

        return this.modules.get(

            name

        ) as T | undefined;

    }

    getModuleNames(): string[] {

        return [

            ...this.modules.keys()

        ];

    }

    getKnowledgeProvider(): WorkspaceKnowledgeProvider {

        return this.knowledgeProvider;

    }

    getDocumentProvider(): WorkspaceDocumentProvider {

        return this.documentProvider;

    }

    getProjectProvider(): WorkspaceProjectProvider {

        return this.projectProvider;

    }

    getHealthStatus() {

        return {

            bootstrapped: this.bootstrapped,

            running: this.running,

            moduleCount: this.modules.size

        };

    }

}