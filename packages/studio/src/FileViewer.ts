import { FileView } from "./FileView.js";

export interface OpenFile {

    path: string;

    content: string;

}

export class FileViewer {

    open(file: OpenFile): FileView {

        if (!file.path.trim()) {

            throw new Error("File path cannot be empty.");

        }

        return new FileView(
            file.path,
            file.content
        );

    }

}