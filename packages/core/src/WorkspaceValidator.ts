import { WorkspaceContext } from "./WorkspaceContext.js";

export class WorkspaceValidator {

    validate(context: WorkspaceContext): boolean {

        return (
            context.workspace.name.length > 0 &&
            context.workspace.version.length > 0 &&
            context.configuration.workspaceVersion.length > 0
        );

    }

}