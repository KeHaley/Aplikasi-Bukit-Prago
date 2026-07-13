import { DeploymentConfiguration } from "./DeploymentConfiguration.js";

export class DeploymentValidator {

    validate(
        configuration: DeploymentConfiguration
    ): boolean {

        return (
            configuration.projectId.trim().length > 0 &&
            configuration.deploymentTarget.trim().length > 0
        );

    }

}