import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

import { RelationshipGraph } from "./RelationshipGraph.js";

export class RelationshipGraphWriter {

    write(

        graph: RelationshipGraph,

        output: string

    ): void {

        mkdirSync(

            dirname(output),

            { recursive: true }

        );

        const lines: string[] = [];

        lines.push("# Relationship Graph");
        lines.push("");

        for (const relationship of graph.getRelationships()) {

            lines.push(

                `- ${relationship.from} --(${relationship.type})--> ${relationship.to}`

            );

        }

        lines.push("");

        lines.push(`Total Relationships : ${graph.count()}`);

        writeFileSync(

            output,

            lines.join("\n"),

            "utf8"

        );

    }

}