import { KnowledgeDocument } from "./KnowledgeDocument.js";
import { KnowledgeSection } from "./KnowledgeDocument.js";

export class ArchitectureDocumentGenerator {

    generate(): KnowledgeDocument {

        return new KnowledgeDocument(

            "Architecture",

            [

                new KnowledgeSection(

                    "Overview",

                    [

                        "Generated automatically from Engineering Knowledge Base."

                    ]

                ),

                new KnowledgeSection(

                    "Layers",

                    [

                        "Production Source",

                        "Parser",

                        "Analyzer",

                        "Engineering Knowledge Base",

                        "Documentation Runtime",

                        "Workspace",

                        "Studio"

                    ]

                )

            ]

        );

    }

}