import { BuildContext } from "./BuildContext.js";
import { BuildPipeline } from "./BuildPipeline.js";
import { BuildResult } from "./BuildResult.js";

export class BuildService {

    private readonly pipeline: BuildPipeline;

    constructor() {

        this.pipeline = new BuildPipeline();

    }

    build(context: BuildContext): BuildResult {

        return this.pipeline.run(context);

    }

    isSuccess(result: BuildResult): boolean {

        return result.success;

    }

    isHealthy(result: BuildResult): boolean {

        return (
            result.success &&
            result.errors.length === 0
        );

    }

    getBuildSummary(result: BuildResult) {

        return {
            success: result.success,
            warningCount: result.warnings.length,
            errorCount: result.errors.length,
            healthy: this.isHealthy(result)
        };

    }

}