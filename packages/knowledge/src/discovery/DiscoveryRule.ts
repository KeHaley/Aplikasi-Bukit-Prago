import { ApplicationEvidence } from "../ApplicationEvidence.js";

export interface DiscoveryRule {

    discover(

        sourcePath: string,

        evidence: ApplicationEvidence

    ): void;

}