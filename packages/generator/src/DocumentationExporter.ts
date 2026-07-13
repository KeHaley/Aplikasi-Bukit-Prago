import { EngineeringKnowledge } from "../../analyzer/src/index.js";

import { DocumentationGenerator } from "./DocumentationGenerator.js";
import { FileWriter } from "./FileWriter.js";

export class DocumentationExporter {

    private readonly generator =
        new DocumentationGenerator();

    private readonly writer =
        new FileWriter();

    export(
        knowledge: EngineeringKnowledge,
        output: string
    ): void {

        const document =
            this.generator.generate(
                knowledge
            );

        this.writer.write(
            output,
            document
        );

    }

}