import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
export class FileWriter {
    write(path, content) {
        mkdirSync(dirname(path), {
            recursive: true
        });
        writeFileSync(path, content, "utf8");
    }
}
//# sourceMappingURL=FileWriter.js.map