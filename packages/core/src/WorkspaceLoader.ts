import { WorkspaceContext } from "./WorkspaceContext.js";
import { WorkspaceEngine } from "./WorkspaceEngine.js";

import { ProjectManager } from "@bpv4/project";

export class WorkspaceLoader {

    private readonly engine: WorkspaceEngine;

    private readonly projectManager: ProjectManager;

    constructor() {

        this.engine = new WorkspaceEngine();
        this.projectManager = new ProjectManager();

    }

    load(): WorkspaceContext {

        return new WorkspaceContext(
            this.engine.getWorkspace(),
            this.projectManager.createConfiguration()
        );

    }

}