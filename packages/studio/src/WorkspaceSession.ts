export interface WorkspaceSessionState {

    projectPath?: string;

    activeEditor?: string;

    openedEditors: readonly string[];

}

export class WorkspaceSession {

    private projectPath?: string;

    private activeEditor?: string;

    private readonly openedEditors: string[] = [];

    setProject(path: string): void {

        this.projectPath = path;

    }

    setActiveEditor(id: string): void {

        this.activeEditor = id;

    }

    openEditor(id: string): void {

        if (!this.openedEditors.includes(id)) {

            this.openedEditors.push(id);

        }

    }

    closeEditor(id: string): void {

        const index = this.openedEditors.indexOf(id);

        if (index >= 0) {

            this.openedEditors.splice(index, 1);

        }

        if (this.activeEditor === id) {

            this.activeEditor = undefined;

        }

    }

    snapshot(): WorkspaceSessionState {

        return {

            projectPath: this.projectPath,

            activeEditor: this.activeEditor,

            openedEditors: [...this.openedEditors]

        };

    }

}