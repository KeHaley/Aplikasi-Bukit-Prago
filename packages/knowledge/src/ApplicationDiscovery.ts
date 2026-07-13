import { ApplicationEvidence } from "./ApplicationEvidence.js";

import { DiscoveryRuleEngine } from "./discovery/DiscoveryRuleEngine.js";

import { ManifestDiscoveryRule } from "./discovery/ManifestDiscoveryRule.js";
import { GoogleScriptDiscoveryRule } from "./discovery/GoogleScriptDiscoveryRule.js";
import { HtmlDiscoveryRule } from "./discovery/HtmlDiscoveryRule.js";
import { SpreadsheetDiscoveryRule } from "./discovery/SpreadsheetDiscoveryRule.js";

export class ApplicationDiscovery {

    private readonly engine =
        new DiscoveryRuleEngine()
            .register(new ManifestDiscoveryRule())
            .register(new GoogleScriptDiscoveryRule())
            .register(new HtmlDiscoveryRule())
            .register(new SpreadsheetDiscoveryRule());

    discover(

        sourcePath: string

    ): ApplicationEvidence {

        return this.engine.discover(

            sourcePath,

            new ApplicationEvidence()

        );

    }

}