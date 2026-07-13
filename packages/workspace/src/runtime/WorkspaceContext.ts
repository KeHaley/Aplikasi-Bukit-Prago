export class WorkspaceContext {

    constructor(

        public readonly workspaceRoot: string,

        public readonly projectRoot: string,

        public readonly outputRoot: string

    ) {}

}