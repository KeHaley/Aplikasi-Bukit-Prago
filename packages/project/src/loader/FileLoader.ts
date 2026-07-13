import { readFileSync } from "node:fs";

export class FileLoader {

    load(path: string): string {

        return readFileSync(path, "utf8");

    }

}