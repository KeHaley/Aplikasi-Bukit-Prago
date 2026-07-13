import { Document } from "./Document.js";
import { DocumentGenerator } from "./DocumentGenerator.js";

export class DocumentService {

    private readonly generator: DocumentGenerator;

    constructor() {

        this.generator = new DocumentGenerator();

    }

    create(
        title: string,
        content: string
    ): Document {

        return this.generator.generate(
            title,
            content
        );

    }

    getSummary(document: Document) {

        return {
            title: document.title,
            contentLength: document.content.length,
            healthy: this.isHealthy(document)
        };

    }

    isHealthy(document: Document): boolean {

        return (
            document.title.trim().length > 0 &&
            document.content.trim().length > 0
        );

    }

}