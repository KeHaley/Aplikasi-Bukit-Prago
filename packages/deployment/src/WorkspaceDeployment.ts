import { DeploymentConfiguration } from "./DeploymentConfiguration.js";
import { DeploymentResult } from "./DeploymentResult.js";

export class WorkspaceDeployment {

    deploy(
        configuration: DeploymentConfiguration
    ): DeploymentResult {

        if (configuration.projectId.trim().length === 0) {

            return new DeploymentResult(
                false,
                "Project ID is required."
            );

        }

        if (configuration.deploymentTarget.trim().length === 0) {

            return new DeploymentResult(
                false,
                "Deployment target is required."
            );

        }

        return new DeploymentResult(
            true,
            "Deployment validation passed."
        );

    }

}