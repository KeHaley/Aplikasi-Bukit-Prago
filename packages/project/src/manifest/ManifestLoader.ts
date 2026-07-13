import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

export class ManifestLoader {

    load(root: string): object | null {

        const file = join(root, "appsscript.json");

        if (!existsSync(file)) {

            return null;

        }

        try {

            return JSON.parse(
                readFileSync(file, "utf8")
            );

        } catch (error) {

            const message =
                error instanceof Error
                    ? error.message
                    : "Unknown JSON parsing error.";

            throw new Error(
                `Invalid appsscript.json: ${message}`
            );

        }

    }

}