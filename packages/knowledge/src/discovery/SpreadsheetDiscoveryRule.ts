import { ApplicationEvidence } from "../ApplicationEvidence.js";
import { DiscoveryRule } from "./DiscoveryRule.js";

export class SpreadsheetDiscoveryRule implements DiscoveryRule {

    discover(

        sourcePath: string,

        evidence: ApplicationEvidence

    ): void {

        // Reserved for EP berikutnya.
        // Tidak melakukan discovery pada EP-02.3.

    }

}