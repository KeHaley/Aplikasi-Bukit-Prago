import { DocumentationGenerator } from "./DocumentationGenerator.js";
import { FileWriter } from "./FileWriter.js";
export class DocumentationExporter {
    generator = new DocumentationGenerator();
    writer = new FileWriter();
    export(knowledge, output) {
        const document = this.generator.generate(knowledge);
        this.writer.write(output, document);
    }
}
//# sourceMappingURL=DocumentationExporter.js.map