import { WorkspaceService } from "@bpv4/workspace";
import { ProjectLoader } from "@bpv4/project";

import { AnalysisPipeline } from "@bpv4/analyzer";
import {
    Studio,
    ExplorerProject
} from "@bpv4/studio";

export class App {

    private readonly workspace =
        new WorkspaceService();

    private readonly studio =
        new Studio();

    run(projectPath: string): void {

        try {

            this.workspace.bootstrap();

            this.workspace.start();

            this.studio.initialize();

            const project =
                new ProjectLoader().load(projectPath);

            const explorerProject: ExplorerProject = {

                files: project.files.map(file => ({

                    path: file.path,

                    name: file.name,

                    extension: file.extension,

                    size: file.size

                }))

            };

            this.studio
                .getWorkbench()
                .loadProject(explorerProject);

            const result =
                new AnalysisPipeline().analyze(project);

            console.log("");

            console.log("=========================================");

            console.log("BPV4 MASTER");

            console.log("=========================================");

            console.log("");

            console.log(
                "Workspace :",
                this.workspace.isHealthy()
                    ? "OK"
                    : "FAILED"
            );

            console.log(
                "Studio    :",
                this.studio.isInitialized()
                    ? "READY"
                    : "FAILED"
            );

            console.log("");

            console.log("Project Loaded");

            console.log("");

            console.log(
                "Files         :",
                project.statistics.totalFiles
            );

            console.log(
                "Parsed Files  :",
                result.parsedFiles
            );

            console.log(
                "Symbols       :",
                result.symbolCount
            );

            console.log(
                "Dependencies  :",
                result.dependencyCount
            );

            console.log(
                "Call Graph    :",
                result.callGraphCount
            );

            console.log(
                "Cross File    :",
                result.crossFileCount
            );

            console.log(
                "Data Flow     :",
                result.dataFlowCount
            );

            console.log("");

            console.log("READY");

            console.log("=========================================");

            console.log("");

        } catch (error) {

            console.error("");

            console.error("=========================================");

            console.error("BPV4 MASTER");

            console.error("=========================================");

            console.error("");

            if (error instanceof Error) {

                console.error(error.message);

            } else {

                console.error("Unknown error.");

            }

            console.error("");

            process.exit(1);

        }

    }

}