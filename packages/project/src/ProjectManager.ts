import { Project } from "./models/Project.js";
import { ProjectConfiguration } from "./ProjectConfiguration.js";

export class ProjectManager {

    create(name: string): Project {

        return {
            name,
            rootPath: "",
            manifestPath: null,
            files: [],
            statistics: {
                totalFiles: 0,
                gasFiles: 0,
                htmlFiles: 0,
                jsonFiles: 0,
                otherFiles: 0,
                totalSize: 0
            }
        };

    }

    createConfiguration(): ProjectConfiguration {

        return new ProjectConfiguration();

    }

}