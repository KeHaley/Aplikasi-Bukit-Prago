import { EngineeringReport } from "./EngineeringReport.js";

export class DocumentationGenerator {

    generate(
        report: EngineeringReport
    ): string {

        const lines: string[] = [];

        lines.push(report.title);
        lines.push("");

        lines.push(
            `Generated : ${report.generatedAt.toISOString()}`
        );

        lines.push("");

        lines.push("Statistics");
        lines.push("----------");

        lines.push(
            `Dependencies : ${report.dependencyCount}`
        );

        lines.push(
            `Call Graph   : ${report.callGraphCount}`
        );

        lines.push(
            `Cross File   : ${report.crossFileCount}`
        );

        lines.push(
            `Data Flow    : ${report.dataFlowCount}`
        );

        return lines.join("\n");

    }

}