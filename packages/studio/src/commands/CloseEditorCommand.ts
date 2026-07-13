import { Workbench } from "../Workbench.js";

export class CloseEditorCommand {

    constructor(

        private readonly workbench: Workbench

    ) {}

    execute(id: string): boolean {

        return this.workbench.unregisterView(id);

    }

}