import { writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

import { KnowledgeCatalog } from "./KnowledgeCatalog.js";

export class KnowledgeCatalogGenerator {

    generate(

        catalog: KnowledgeCatalog,

        output: string

    ): void {

        mkdirSync(
            dirname(output),
            { recursive: true }
        );

        const lines: string[] = [];

        lines.push("# Knowledge Catalog");
        lines.push("");

        for (const artifact of catalog.getArtifacts()) {

            lines.push(`## ${artifact.name}`);
            lines.push("");
            lines.push(`- ID : ${artifact.id}`);
            lines.push(`- Category : ${artifact.category}`);
            lines.push(`- Source : ${artifact.source}`);
            lines.push(`- Description : ${artifact.description}`);
            lines.push("");

        }

        writeFileSync(
            output,
            lines.join("\n"),
            "utf8"
        );

    }

}