import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { ApplicationProfile } from "./ApplicationProfile.js";

export class ApplicationProfileWriter {

    write(profile: ApplicationProfile, outputPath: string): void {

        // Ensure output directory exists
        const outputDir = dirname(outputPath);
        if (!existsSync(outputDir)) {

            mkdirSync(outputDir, { recursive: true });

        }

        // Generate markdown content with all sections
        const markdown = this.generateMarkdown(profile);

        // Write to file
        writeFileSync(outputPath, markdown, "utf-8");

    }

    private generateMarkdown(profile: ApplicationProfile): string {

        const summary = profile.getSummary();
        const lines: string[] = [];

        // Title
        lines.push("# Application Profile");
        lines.push("");

        // Section: Identity
        lines.push("## Identity");
        lines.push("");
        lines.push(`- **Name:** ${profile.identity.name}`);
        lines.push(`- **Version:** ${profile.identity.version}`);
        lines.push(`- **Discovered:** ${profile.identity.discoveredAt.toISOString()}`);
        lines.push("");

        // Section: Production Source
        lines.push("## Production Source");
        lines.push("");

        if (profile.evidence.appsscriptManifestContent) {

            lines.push("### Manifest");
            lines.push("```json");
            lines.push(profile.evidence.appsscriptManifestContent);
            lines.push("```");
            lines.push("");

        } else {

            lines.push("*(No appsscript.json manifest discovered)*");
            lines.push("");

        }

        lines.push("### Files");
        lines.push(`- **Kode.gs:** ${profile.evidence.kodesGsExists ? "Found" : "Not found"}`);
        lines.push("");

        // Section: Source Inventory
        lines.push("## Source Inventory");
        lines.push("");

        if (summary.totalFiles > 0) {

            for (const file of profile.inventory.sourceFiles) {

                lines.push(`### ${file.name}`);
                lines.push(`- **Type:** ${file.type}`);
                lines.push(`- **Path:** ${file.path}`);
                lines.push("");

            }

        } else {

            lines.push("*(No source files discovered)*");
            lines.push("");

        }

        // Section: UI
        lines.push("## UI");
        lines.push("");

        if (profile.evidence.indexHtmlContent) {

            lines.push("**Index.html Evidence:** Available");
            lines.push("");
            lines.push("*(Raw HTML content stored in ApplicationEvidence)*");
            lines.push("");

        } else {

            lines.push("*(No Index.html discovered)*");
            lines.push("");

        }

        // Section: Statistics
        lines.push("## Statistics");
        lines.push("");
        lines.push(`- **Total Files:** ${profile.statistics.totalFiles}`);
        lines.push(`- **Configuration Files:** ${profile.statistics.configurationFiles}`);
        lines.push(`- **Script Files:** ${profile.statistics.scriptFiles}`);
        lines.push(`- **UI Files:** ${profile.statistics.uiFiles}`);
        lines.push("");

        // Section: Generated
        lines.push("## Generated");
        lines.push("");
        lines.push(`- **Generated At:** ${new Date().toISOString()}`);
        lines.push(`- **Source Path:** ${profile.inventory.sourceFiles[0]?.path || "Unknown"}`);
        lines.push("");

        return lines.join("\n");

    }

}
