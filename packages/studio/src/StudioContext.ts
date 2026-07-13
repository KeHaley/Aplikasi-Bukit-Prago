import { Workbench } from "./Workbench.js";

export class StudioContext {

    constructor(

        private readonly workbench: Workbench

    ) {}

    getWorkbench(): Workbench {

        return this.workbench;

    }

    getKnowledge() {

        return this.workbench.getKnowledge();

    }

    getKnowledgeWorkspace() {

        return this.workbench.getKnowledgeWorkspace();

    }

}