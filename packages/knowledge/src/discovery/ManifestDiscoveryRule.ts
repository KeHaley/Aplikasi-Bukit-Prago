import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { ApplicationEvidence } from "../ApplicationEvidence.js";
import { DiscoveryRule } from "./DiscoveryRule.js";

export class ManifestDiscoveryRule implements DiscoveryRule {

    discover(

        sourcePath: string,

        evidence: ApplicationEvidence

    ): void {

        const path = join(
            sourcePath,
            "appsscript.json"
        );

        if (!existsSync(path)) {

            return;

        }

        evidence.appsscriptManifestPath = path;
        evidence.appsscriptManifestContent =
            readFileSync(
                path,
                "utf8"
            );

    }

}