import { DeploymentConfiguration } from "./DeploymentConfiguration.js";
import { DeploymentContext } from "./DeploymentContext.js";
import { DeploymentHealth } from "./DeploymentHealth.js";
import { DeploymentMetadata } from "./DeploymentMetadata.js";
import { DeploymentReport } from "./DeploymentReport.js";
import { DeploymentResult } from "./DeploymentResult.js";
import { DeploymentStatus } from "./DeploymentStatus.js";
import { DeploymentSummary } from "./DeploymentSummary.js";
import { DeploymentValidator } from "./DeploymentValidator.js";
import { WorkspaceDeployment } from "./WorkspaceDeployment.js";

export class DeploymentService {

    private readonly deployment: WorkspaceDeployment;

    private readonly validator: DeploymentValidator;

    constructor() {

        this.deployment = new WorkspaceDeployment();
        this.validator = new DeploymentValidator();

    }

    deploy(
        configuration: DeploymentConfiguration
    ): DeploymentResult {

        if (!this.validator.validate(configuration)) {

            return new DeploymentResult(
                false,
                "Deployment configuration is invalid."
            );

        }

        return this.deployment.deploy(configuration);

    }

    isSuccess(result: DeploymentResult): boolean {

        return result.success;

    }

    isHealthy(result: DeploymentResult): boolean {

        return (
            result.success &&
            result.message.length > 0
        );

    }

    getStatus(result: DeploymentResult): DeploymentStatus {

        return result.success
            ? DeploymentStatus.Success
            : DeploymentStatus.Failed;

    }

    createContext(
        configuration: DeploymentConfiguration,
        result: DeploymentResult
    ): DeploymentContext {

        return new DeploymentContext(
            configuration,
            this.getStatus(result)
        );

    }

    getMetadata(
        configuration: DeploymentConfiguration
    ): DeploymentMetadata {

        return new DeploymentMetadata(
            configuration.projectId,
            configuration.deploymentTarget,
            new Date()
        );

    }

    getHealth(result: DeploymentResult): DeploymentHealth {

        return new DeploymentHealth(
            this.isHealthy(result),
            result.message
        );

    }

    getSummary(result: DeploymentResult): DeploymentSummary {

        return new DeploymentSummary(
            result.success,
            result.message,
            this.isHealthy(result)
        );

    }

    getReport(result: DeploymentResult): DeploymentReport {

        return new DeploymentReport(
            this.getSummary(result),
            new Date()
        );

    }

}