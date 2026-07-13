export class ApplicationStatistics {

    constructor(

        public readonly totalFiles: number,

        public readonly configurationFiles: number,

        public readonly scriptFiles: number,

        public readonly uiFiles: number

    ) {}

}
