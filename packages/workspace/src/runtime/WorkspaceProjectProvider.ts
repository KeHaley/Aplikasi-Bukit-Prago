export interface WorkspaceProject {

    id: string;

    name: string;

    root: string;

}

export class WorkspaceProjectProvider {

    private readonly projects: WorkspaceProject[] = [];

    add(

        project: WorkspaceProject

    ): void {

        this.projects.push(project);

    }

    addRange(

        projects: readonly WorkspaceProject[]

    ): void {

        this.projects.push(...projects);

    }

    getAll(): readonly WorkspaceProject[] {

        return this.projects;

    }

    findById(

        id: string

    ): WorkspaceProject | undefined {

        return this.projects.find(

            project => project.id === id

        );

    }

    clear(): void {

        this.projects.length = 0;

    }

}