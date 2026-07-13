import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

import { KnowledgeDocument } from "./KnowledgeDocument.js";

export class KnowledgeDocumentWriter {

    write(

        document: KnowledgeDocument,

        output: string

    ): void {

        mkdirSync(

            dirname(output),

            { recursive: true }

        );

        const lines: string[] = [];

        lines.push(`# ${document.title}`);
        lines.push("");

        for (const section of document.sections) {

            lines.push(`## ${section.title}`);
            lines.push("");

            lines.push(...section.lines);

            lines.push("");

        }

        writeFileSync(

            output,

            lines.join("\n"),

            "utf8"

        );

    }

}