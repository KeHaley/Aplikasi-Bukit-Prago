import { KnowledgeDocument } from "./KnowledgeDocument.js";
import { KnowledgeDocumentWriter } from "./KnowledgeDocumentWriter.js";

export class DocumentationRuntime {

    private readonly writer =
        new KnowledgeDocumentWriter();

    generate(

        documents: readonly {

            document: KnowledgeDocument;

            output: string;

        }[]

    ): void {

        for (const item of documents) {

            this.writer.write(

                item.document,

                item.output

            );

        }

    }

}