export class DeploymentSummary {

    constructor(

        public readonly success: boolean,

        public readonly message: string,

        public readonly healthy: boolean

    ) {
    }

}