import { SourceFile } from "./SourceFile.js";
import { ProjectStatistics } from "./ProjectStatistics.js";

export interface Project {

    name: string;

    rootPath: string;

    manifestPath: string | null;

    files: SourceFile[];

    statistics: ProjectStatistics;

}