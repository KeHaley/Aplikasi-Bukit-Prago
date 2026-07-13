import { BuildContext } from "./BuildContext.js";
import { BuildResult } from "./BuildResult.js";

export class WorkspaceBuilder {

    build(context: BuildContext): BuildResult {

        if (context.workspaceRoot.trim().length === 0) {

            return BuildResult.failureResult([
                "Workspace root is required."
            ]);

        }

        if (context.outputDirectory.trim().length === 0) {

            return BuildResult.failureResult([
                "Output directory is required."
            ]);

        }

        return BuildResult.successResult();

    }

}