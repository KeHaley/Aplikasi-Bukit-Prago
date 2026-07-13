import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

import { KnowledgeGraph } from "./KnowledgeGraph.js";

export class KnowledgeGraphWriter {

    write(

        graph: KnowledgeGraph,

        output: string

    ): void {

        mkdirSync(

            dirname(output),

            { recursive: true }

        );

        const lines: string[] = [];

        lines.push("# Engineering Knowledge Graph");
        lines.push("");

        lines.push("## Nodes");
        lines.push("");

        for (const node of graph.getNodes()) {

            lines.push(

                `- ${node.id} | ${node.type} | ${node.name}`

            );

        }

        lines.push("");

        lines.push("## Edges");
        lines.push("");

        for (const edge of graph.getEdges()) {

            lines.push(

                `- ${edge.from} --(${edge.type})--> ${edge.to}`

            );

        }

        lines.push("");

        lines.push(`Total Nodes : ${graph.nodeCount()}`);
        lines.push(`Total Edges : ${graph.edgeCount()}`);

        writeFileSync(

            output,

            lines.join("\n"),

            "utf8"

        );

    }

}