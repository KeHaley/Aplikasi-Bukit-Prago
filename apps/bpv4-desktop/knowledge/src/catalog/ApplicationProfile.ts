import { ApplicationDatabase } from "./ApplicationDatabase.js";
import { ApplicationSource } from "./ApplicationSource.js";
import { ApplicationStatistics } from "./ApplicationStatistics.js";

export class ApplicationProfile {

    constructor(

        public readonly name: string,

        public readonly platform: string,

        public readonly language: string,

        public readonly source: ApplicationSource,

        public readonly database: ApplicationDatabase,

        public readonly statistics: ApplicationStatistics

    ) {}

}