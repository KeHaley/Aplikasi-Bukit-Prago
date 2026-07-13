import { EngineeringKnowledge } from "./EngineeringKnowledge.js";
import { EngineeringReport } from "./EngineeringReport.js";

export class EngineeringReportBuilder {

    build(
        knowledge: EngineeringKnowledge
    ): EngineeringReport {

        return new EngineeringReport(
            knowledge
        );

    }

}