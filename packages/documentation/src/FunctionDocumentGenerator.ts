import { KnowledgeDocument, KnowledgeSection } from "./KnowledgeDocument.js";

export interface FunctionDocumentItem {

    name: string;

    signature?: string;

}

export class FunctionDocumentGenerator {

    generate(

        functions: readonly FunctionDocumentItem[]

    ): KnowledgeDocument {

        const lines = functions.length > 0

            ? functions.map(

                fn => `- ${fn.name}${fn.signature ? ` : ${fn.signature}` : ""}`

            )

            : ["No functions discovered."];

        return new KnowledgeDocument(

            "Functions",

            [

                new KnowledgeSection(

                    "Function Catalog",

                    lines

                )

            ]

        );

    }

}