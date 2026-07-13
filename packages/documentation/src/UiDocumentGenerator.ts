import { KnowledgeDocument, KnowledgeSection } from "./KnowledgeDocument.js";

export interface UiDocumentItem {

    name: string;

    type: string;

    description?: string;

}

export class UiDocumentGenerator {

    generate(

        components: readonly UiDocumentItem[]

    ): KnowledgeDocument {

        const lines = components.length > 0

            ? components.map(

                component =>
                    `- ${component.name} (${component.type})${component.description ? ` : ${component.description}` : ""}`

            )

            : ["No UI components discovered."];

        return new KnowledgeDocument(

            "UI",

            [

                new KnowledgeSection(

                    "UI Catalog",

                    lines

                )

            ]

        );

    }

}