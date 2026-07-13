import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { ApplicationEvidence } from "../ApplicationEvidence.js";
import { DiscoveryRule } from "./DiscoveryRule.js";

export class HtmlDiscoveryRule implements DiscoveryRule {

    discover(

        sourcePath: string,

        evidence: ApplicationEvidence

    ): void {

        const path = join(
            sourcePath,
            "Index.html"
        );

        if (!existsSync(path)) {

            return;

        }

        evidence.indexHtmlPath = path;
        evidence.indexHtmlContent =
            readFileSync(
                path,
                "utf8"
            );

    }

}