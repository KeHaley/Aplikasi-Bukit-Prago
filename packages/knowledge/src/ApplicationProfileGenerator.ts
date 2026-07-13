import { ApplicationDiscovery } from "./ApplicationDiscovery.js";
import { ApplicationProfile, SourceFile } from "./ApplicationProfile.js";
import { ManifestInterpreter } from "./ManifestInterpreter.js";
import { ApplicationInventory } from "./ApplicationInventory.js";
import { ApplicationStatistics } from "./ApplicationStatistics.js";
import { ApplicationProfileWriter } from "./ApplicationProfileWriter.js";

export class ApplicationProfileGenerator {

    private discovery: ApplicationDiscovery;
    private manifestInterpreter: ManifestInterpreter;
    private writer: ApplicationProfileWriter;

    constructor() {

        this.discovery = new ApplicationDiscovery();
        this.manifestInterpreter = new ManifestInterpreter();
        this.writer = new ApplicationProfileWriter();

    }

    generate(sourcePath: string, outputPath: string): void {

        // Step 1: Discover raw evidence only
        const evidence = this.discovery.discover(sourcePath);

        // Step 2: Build identity from evidence
        const identity = this.manifestInterpreter.interpret(evidence.appsscriptManifestContent);

        // Step 3: Build inventory from evidence
        const sourceFiles: SourceFile[] = [];
        if (evidence.appsscriptManifestPath) {

            sourceFiles.push(new SourceFile("appsscript.json", "configuration", evidence.appsscriptManifestPath));

        }

        if (evidence.kodesGsPath) {

            sourceFiles.push(new SourceFile("Kode.gs", "scripts", evidence.kodesGsPath));

        }

        if (evidence.indexHtmlPath) {

            sourceFiles.push(new SourceFile("Index.html", "ui", evidence.indexHtmlPath));

        }

        const inventory = new ApplicationInventory(sourceFiles);

        // Step 4: Build statistics from evidence
        let configCount = 0;
        let scriptCount = 0;
        let uiCount = 0;

        if (evidence.appsscriptManifestPath) configCount++;
        if (evidence.kodesGsPath) scriptCount++;
        if (evidence.indexHtmlPath) uiCount++;

        const statistics = new ApplicationStatistics(

            sourceFiles.length,
            configCount,
            scriptCount,
            uiCount

        );

        // Step 5: Compose profile (DTO only)
        const profile = new ApplicationProfile(identity, inventory, statistics, evidence);

        // Step 6: Write profile to markdown
        this.writer.write(profile, outputPath);

    }

}
