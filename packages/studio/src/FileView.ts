import { View } from "./View.js";

export class FileView extends View {

    constructor(

        public readonly path: string,

        public readonly content: string

    ) {

        super(path, path);

    }

}