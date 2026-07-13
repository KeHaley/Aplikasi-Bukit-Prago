import { ApplicationIdentity } from "./ApplicationIdentity.js";

export class ManifestInterpreter {

    interpret(manifestContent: string | null): ApplicationIdentity {

        let appName = "Unknown Application";
        let appVersion = "1.0.0";

        if (manifestContent) {

            try {

                const manifest = JSON.parse(manifestContent);
                if (manifest.name) appName = manifest.name;
                if (manifest.version) appVersion = manifest.version;

            } catch (e) {
                // Silently handle JSON parse errors - keep defaults
            }

        }

        return new ApplicationIdentity(appName, appVersion, new Date());

    }

}
