import * as fs from "node:fs";

export class SourceReader {

    read(filePath: string): string {

        return fs.readFileSync(
            filePath,
            "utf8"
        );

    }

}