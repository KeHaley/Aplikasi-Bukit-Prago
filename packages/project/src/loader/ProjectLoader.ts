import path from "node:path";

import { Project } from "../models/Project.js";
import { ProjectStatistics } from "../models/ProjectStatistics.js";

import { FileLoader } from "./FileLoader.js";
import { ProjectScanner } from "../scanner/ProjectScanner.js";
import { ManifestLoader } from "../manifest/ManifestLoader.js";

export class ProjectLoader {

    load(root: string): Project {

        const scanner = new ProjectScanner();

        const loader = new FileLoader();

        const files = scanner.scan(root);

        for (const file of files) {

            file.content = loader.load(file.path);

        }

        const manifest =
            new ManifestLoader().load(root);

        const statistics: ProjectStatistics = {

            totalFiles: files.length,

            gasFiles: files.filter(f => f.extension === ".gs").length,

            htmlFiles: files.filter(f => f.extension === ".html").length,

            jsonFiles: files.filter(f => f.extension === ".json").length,

            otherFiles: files.filter(
                f => ![".gs", ".html", ".json"].includes(f.extension)
            ).length,

            totalSize: files.reduce(
                (x, y) => x + y.size,
                0
            )

        };

        return {

            name: path.basename(root),

            rootPath: root,

            manifestPath: manifest
                ? "appsscript.json"
                : null,

            files,

            statistics

        };

    }

}