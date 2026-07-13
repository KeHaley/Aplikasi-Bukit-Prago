import { existsSync } from "fs";
import { join } from "path";

export class ReleaseValidator {

    validate(): void {

        this.requireFile("index.js");
        this.requireFile("index.js.map");
        this.requireFile("index.d.ts");
        this.requireFile("index.d.ts.map");

    }

    private requireFile(
        fileName: string
    ): void {

        const file = join(
            __dirname,
            fileName
        );

        if (!existsSync(file)) {

            throw new Error(
                `Release file tidak ditemukan: ${fileName}`
            );

        }

    }

}