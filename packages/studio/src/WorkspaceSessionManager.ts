import {
    WorkspaceSession,
    WorkspaceSessionState
} from "./WorkspaceSession.js";
import { ProjectExplorer } from "./explorer/ProjectExplorer.js";
import { ExplorerWorkspaceState } from "./explorer/ExplorerWorkspaceState.js";

export class WorkspaceSessionManager {

    private readonly session: WorkspaceSession;

    private explorerState?: ExplorerWorkspaceState;

    constructor() {

        this.session = new WorkspaceSession();

    }

    getSession(): WorkspaceSession {

        return this.session;

    }

    snapshot(): WorkspaceSessionState {

        return this.session.snapshot();

    }

    captureExplorer(
        explorer: ProjectExplorer
    ): void {

        this.explorerState =
            explorer.captureWorkspaceState();

    }

    restoreExplorer(
        explorer: ProjectExplorer
    ): void {

        if (!this.explorerState) {

            return;

        }

        explorer.restoreWorkspaceState(
            this.explorerState
        );

    }

    restore(state: WorkspaceSessionState): void {

        this.session.setProject(
            state.projectPath ?? ""
        );

        for (const editor of state.openedEditors) {

            this.session.openEditor(editor);

        }

        if (state.activeEditor) {

            this.session.setActiveEditor(
                state.activeEditor
            );

        }

    }

    setProject(path: string): void {

        this.session.setProject(path);

    }

    openEditor(id: string): void {

        this.session.openEditor(id);

        this.session.setActiveEditor(id);

    }

    closeEditor(id: string): void {

        this.session.closeEditor(id);

    }

    setActiveEditor(id: string): void {

        this.session.setActiveEditor(id);

    }

    setExplorerState(
        state: ExplorerWorkspaceState
    ): void {

        this.explorerState = state;

    }

    getExplorerState(): ExplorerWorkspaceState | undefined {

        return this.explorerState;

    }

    clearExplorerState(): void {

        this.explorerState = undefined;

    }

}