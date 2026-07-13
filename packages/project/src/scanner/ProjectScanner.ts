import { readdirSync, statSync } from "node:fs";
import { basename, extname, join } from "node:path";

import { SourceFile } from "../models/SourceFile.js";
import { SourceType } from "../models/SourceType.js";

export class ProjectScanner {

    scan(root: string): SourceFile[] {

        const files: SourceFile[] = [];

        this.scanDirectory(root, root, files);

        return files;

    }

    private scanDirectory(
        root: string,
        current: string,
        files: SourceFile[]
    ): void {

        for (const entry of readdirSync(current)) {

            const fullPath = join(current, entry);

            const stat = statSync(fullPath);

            if (stat.isDirectory()) {

                this.scanDirectory(root, fullPath, files);

                continue;

            }

            const extension = extname(entry).toLowerCase();

            files.push({
                path: fullPath,
                name: basename(entry),
                extension,
                type: this.resolveType(extension),
                content: "",
                size: stat.size,
                hash: ""
            });

        }

    }

    private resolveType(extension: string): SourceType {

        switch (extension) {

            case ".gs":
                return SourceType.GAS;

            case ".html":
                return SourceType.HTML;

            case ".json":
                return SourceType.JSON;

            case ".ts":
                return SourceType.TYPESCRIPT;

            case ".js":
                return SourceType.JAVASCRIPT;

            case ".md":
                return SourceType.MARKDOWN;

            default:
                return SourceType.OTHER;

        }

    }

}