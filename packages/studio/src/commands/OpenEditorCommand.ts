import { OpenFile } from "../FileViewer.js";
import { Workbench } from "../Workbench.js";

export class OpenEditorCommand {

    constructor(

        private readonly workbench: Workbench

    ) {}

    execute(file: OpenFile): void {

        this.workbench.openFile(file);

    }

}