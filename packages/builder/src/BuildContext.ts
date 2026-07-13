export class BuildContext {

    readonly workspaceRoot: string;

    readonly outputDirectory: string;

    readonly configuration: string;

    constructor(
        workspaceRoot: string,
        outputDirectory: string,
        configuration = "Release"
    ) {

        this.workspaceRoot = workspaceRoot;
        this.outputDirectory = outputDirectory;
        this.configuration = configuration;

    }

}