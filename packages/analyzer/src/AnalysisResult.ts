import { EngineeringKnowledge } from "./EngineeringKnowledge.js";
import { EngineeringReport } from "./EngineeringReport.js";

export interface AnalysisResult {

    parsedFiles: number;

    symbolCount: number;

    dependencyCount: number;

    callGraphCount: number;

    crossFileCount: number;

    dataFlowCount: number;

    knowledge: EngineeringKnowledge;

    report: EngineeringReport;

}