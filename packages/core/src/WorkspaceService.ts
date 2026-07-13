import { ProjectManager } from "@bpv4/project";

import { WorkspaceEngine } from "./WorkspaceEngine.js";
import { WorkspaceLoader } from "./WorkspaceLoader.js";
import { WorkspaceSession } from "./WorkspaceSession.js";
import { WorkspaceValidator } from "./WorkspaceValidator.js";

export class WorkspaceService {

    private readonly engine: WorkspaceEngine;

    private readonly projectManager: ProjectManager;

    private readonly loader: WorkspaceLoader;

    private readonly validator: WorkspaceValidator;

    constructor(
        engine: WorkspaceEngine = new WorkspaceEngine(),
        projectManager: ProjectManager = new ProjectManager(),
        loader: WorkspaceLoader = new WorkspaceLoader(),
        validator: WorkspaceValidator = new WorkspaceValidator()
    ) {

        this.engine = engine;
        this.projectManager = projectManager;
        this.loader = loader;
        this.validator = validator;

    }

    createSession(): WorkspaceSession {

        return new WorkspaceSession(
            this.loader.load()
        );

    }

    getWorkspaceName(): string {

        return this.engine.getWorkspace().name;

    }

    getWorkspaceVersion(): string {

        return this.engine.getWorkspace().version;

    }

    getWorkspaceSummary() {

        return {
            name: this.getWorkspaceName(),
            version: this.getWorkspaceVersion(),
            healthy: this.isHealthy()
        };

    }

    getProjectManager(): ProjectManager {

        return this.projectManager;

    }

    isHealthy(): boolean {

        return this.validate();

    }

    validate(): boolean {

        return this.validator.validate(
            this.createSession().getContext()
        );

    }

}