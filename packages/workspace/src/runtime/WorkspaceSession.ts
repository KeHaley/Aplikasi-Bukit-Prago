import { WorkspaceContext } from "./WorkspaceContext.js";

export class WorkspaceSession {

    constructor(

        public readonly context: WorkspaceContext,

        public readonly startedAt: Date = new Date()

    ) {}

}