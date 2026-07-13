import { ProjectConfiguration } from "@bpv4/project";

import { Workspace } from "./Workspace.js";

export class WorkspaceContext {

    constructor(
        public readonly workspace: Workspace,
        public readonly configuration: ProjectConfiguration
    ) {
    }

}