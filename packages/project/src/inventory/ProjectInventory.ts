import { SourceFile } from "../models/SourceFile.js";

export class ProjectInventory {

    constructor(
        public readonly files: SourceFile[]
    ) {}

    totalFiles(): number {

        return this.files.length;

    }

}