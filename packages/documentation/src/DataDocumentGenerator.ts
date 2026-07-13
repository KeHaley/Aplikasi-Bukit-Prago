import { KnowledgeDocument, KnowledgeSection } from "./KnowledgeDocument.js";

export interface DataDocumentItem {

    name: string;

    type: string;

    description?: string;

}

export class DataDocumentGenerator {

    generate(

        data: readonly DataDocumentItem[]

    ): KnowledgeDocument {

        const lines = data.length > 0

            ? data.map(

                item =>
                    `- ${item.name} (${item.type})${item.description ? ` : ${item.description}` : ""}`

            )

            : ["No data discovered."];

        return new KnowledgeDocument(

            "Data",

            [

                new KnowledgeSection(

                    "Data Catalog",

                    lines

                )

            ]

        );

    }

}