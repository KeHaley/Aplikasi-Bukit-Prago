import { BuildContext } from "./BuildContext.js";
import { BuildResult } from "./BuildResult.js";
import { WorkspaceBuilder } from "./WorkspaceBuilder.js";

export class BuildPipeline {

    private readonly builder: WorkspaceBuilder;

    constructor() {

        this.builder = new WorkspaceBuilder();

    }

    run(context: BuildContext): BuildResult {

        return this.builder.build(context);

    }

}