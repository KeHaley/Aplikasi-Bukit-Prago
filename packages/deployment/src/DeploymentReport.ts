import { DeploymentSummary } from "./DeploymentSummary.js";

export class DeploymentReport {

    constructor(

        public readonly summary: DeploymentSummary,

        public readonly generatedAt: Date

    ) {
    }

}