import { SourceType } from "./SourceType.js";

export interface SourceFile {

    path: string;

    name: string;

    extension: string;

    type: SourceType;

    content: string;

    size: number;

    hash: string;

}