import { DeploymentConfiguration } from "./DeploymentConfiguration.js";
import { DeploymentStatus } from "./DeploymentStatus.js";

export class DeploymentContext {

    constructor(

        public readonly configuration: DeploymentConfiguration,

        public readonly status: DeploymentStatus

    ) {
    }

}