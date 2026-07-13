import { existsSync } from "node:fs";
import { join } from "node:path";

import { ApplicationEvidence } from "../ApplicationEvidence.js";
import { DiscoveryRule } from "./DiscoveryRule.js";

export class GoogleScriptDiscoveryRule implements DiscoveryRule {

    discover(

        sourcePath: string,

        evidence: ApplicationEvidence

    ): void {

        const path = join(
            sourcePath,
            "Kode.gs"
        );

        if (!existsSync(path)) {

            return;

        }

        evidence.kodesGsPath = path;
        evidence.kodesGsExists = true;

    }

}