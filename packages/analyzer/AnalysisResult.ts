import { AnalysisContext } from "./AnalysisContext.js";
import { EngineeringKnowledge } from "./EngineeringKnowledge.js";
import { EngineeringReport } from "./EngineeringReport.js";

export interface AnalysisResult {

    readonly contexts: readonly AnalysisContext[];

    readonly parsedFiles: number;

    readonly symbolCount: number;

    readonly dependencyCount: number;

    readonly callGraphCount: number;

    readonly crossFileCount: number;

    readonly dataFlowCount: number;

    readonly knowledge: EngineeringKnowledge;

    readonly report: EngineeringReport;

}