import { ApplicationEvidence } from "../ApplicationEvidence.js";
import { DiscoveryRule } from "./DiscoveryRule.js";

export class DiscoveryRuleEngine {

    private readonly rules: DiscoveryRule[] = [];

    register(

        rule: DiscoveryRule

    ): this {

        this.rules.push(rule);

        return this;

    }

    discover(

        sourcePath: string,

        evidence: ApplicationEvidence

    ): ApplicationEvidence {

        for (const rule of this.rules) {

            rule.discover(
                sourcePath,
                evidence
            );

        }

        return evidence;

    }

}