import { KnowledgeDocument, KnowledgeSection } from "./KnowledgeDocument.js";

export interface ApiDocumentItem {

    name: string;

    method: string;

    path: string;

}

export class ApiDocumentGenerator {

    generate(

        apis: readonly ApiDocumentItem[]

    ): KnowledgeDocument {

        const lines = apis.length > 0

            ? apis.map(

                api => `- [${api.method}] ${api.path} (${api.name})`

            )

            : ["No APIs discovered."];

        return new KnowledgeDocument(

            "API",

            [

                new KnowledgeSection(

                    "API Catalog",

                    lines

                )

            ]

        );

    }

}