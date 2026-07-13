import { Workbench } from "../Workbench.js";

export class ActivateEditorCommand {

    constructor(

        private readonly workbench: Workbench

    ) {}

    execute(id: string): boolean {

        return this.workbench.activateView(id);

    }

}