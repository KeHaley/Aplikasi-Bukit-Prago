export class BuildResult {

    readonly success: boolean;

    readonly warnings: string[];

    readonly errors: string[];

    constructor(
        success: boolean,
        warnings: string[] = [],
        errors: string[] = []
    ) {

        this.success = success;
        this.warnings = warnings;
        this.errors = errors;

    }

    static successResult(): BuildResult {

        return new BuildResult(true);

    }

    static failureResult(errors: string[]): BuildResult {

        return new BuildResult(
            false,
            [],
            errors
        );

    }

}