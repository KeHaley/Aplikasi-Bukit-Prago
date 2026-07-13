export class DeploymentMetadata {

    constructor(

        public readonly projectId: string,

        public readonly deploymentTarget: string,

        public readonly createdAt: Date

    ) {
    }

}