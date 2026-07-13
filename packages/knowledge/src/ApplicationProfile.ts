import { ApplicationIdentity } from "./ApplicationIdentity.js";
import { ApplicationInventory, SourceFile } from "./ApplicationInventory.js";
import { ApplicationStatistics } from "./ApplicationStatistics.js";
import { ApplicationEvidence } from "./ApplicationEvidence.js";

export class ApplicationProfile {

    constructor(

        public readonly identity: ApplicationIdentity,

        public readonly inventory: ApplicationInventory,

        public readonly statistics: ApplicationStatistics,

        public readonly evidence: ApplicationEvidence

    ) {}

    getSummary(): {

        name: string;
        version: string;
        totalFiles: number;
        totalComponents: number;

    } {

        return {

            name: this.identity.name,
            version: this.identity.version,
            totalFiles: this.statistics.totalFiles,
            totalComponents: this.statistics.configurationFiles + this.statistics.scriptFiles + this.statistics.uiFiles,

        };

    }

}

// Re-export SourceFile for convenience
export { SourceFile };
