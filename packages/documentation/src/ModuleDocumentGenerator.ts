import { KnowledgeDocument, KnowledgeSection } from "./KnowledgeDocument.js";

export interface ModuleDocumentItem {

    name: string;

}

export class ModuleDocumentGenerator {

    generate(

        modules: readonly ModuleDocumentItem[]

    ): KnowledgeDocument {

        const lines = modules.length > 0

            ? modules.map(module => `- ${module.name}`)

            : ["No modules discovered."];

        return new KnowledgeDocument(

            "Modules",

            [

                new KnowledgeSection(

                    "Module Catalog",

                    lines

                )

            ]

        );

    }

}