import { dirname } from "node:path";

import { ExplorerSelection } from "./ExplorerSelection.js";
import { ExplorerState } from "./ExplorerState.js";
import { ExplorerWorkspaceState } from "./ExplorerWorkspaceState.js";
import { ProjectNode } from "./ProjectNode.js";

export interface ExplorerFile {

    path: string;

    name: string;

    extension: string;

    size: number;

}

export interface ExplorerProject {

    files: readonly ExplorerFile[];

}

export class ProjectExplorer {

    private readonly nodes = new Map<string, ProjectNode>();

    private readonly roots: ProjectNode[] = [];

    private readonly selection: ExplorerSelection;

    private readonly state: ExplorerState;

    private selectedNode?: ProjectNode;

    constructor(project: ExplorerProject) {

        this.selection = new ExplorerSelection();

        this.state = new ExplorerState();

        for (const file of project.files) {

            const node = new ProjectNode(
                file.name,
                file.path,
                file.extension,
                file.size
            );

            this.nodes.set(file.path, node);

        }

        for (const node of this.nodes.values()) {

            const parent = this.nodes.get(dirname(node.path));

            if (parent) {

                parent.addChild(node);

            } else {

                this.roots.push(node);

            }

        }

    }

    has(path: string): boolean {

        return this.nodes.has(path);

    }

    get(path: string): ProjectNode | undefined {

        return this.nodes.get(path);

    }

    select(path: string): boolean {

        const node = this.nodes.get(path);

        if (!node) {

            return false;

        }

        this.selectedNode = node;

        this.selection.select(path);

        return true;

    }

    getSelected(): ProjectNode | undefined {

        return this.selectedNode;

    }

    getSelection(): string | undefined {

        return this.selection.getSelection();

    }

    hasSelection(): boolean {

        return this.selection.hasSelection();

    }

    clearSelection(): void {

        this.selectedNode = undefined;

        this.selection.clear();

    }

    expand(path: string): void {

        this.state.expand(path);

    }

    collapse(path: string): void {

        this.state.collapse(path);

    }

    isExpanded(path: string): boolean {

        return this.state.isExpanded(path);

    }

    getExpanded(): readonly string[] {

        return this.state.getExpanded();

    }

    getRoots(): readonly ProjectNode[] {

        return this.roots;

    }

    getNodes(): readonly ProjectNode[] {

        return [...this.nodes.values()];

    }

    getFileCount(): number {

        return this.nodes.size;

    }

    isEmpty(): boolean {

        return this.nodes.size === 0;

    }

    captureWorkspaceState(): ExplorerWorkspaceState {

        const state = new ExplorerWorkspaceState();

        state.setSelected(this.getSelection());

        state.setExpanded(this.getExpanded());

        return state;

    }

    restoreWorkspaceState(
        state: ExplorerWorkspaceState
    ): void {

        this.clearSelection();

        this.state.clear();

        const selected = state.getSelected();

        if (selected) {

            this.select(selected);

        }

        for (const path of state.getExpanded()) {

            this.expand(path);

        }

    }

    clear(): void {

        this.selectedNode = undefined;

        this.selection.clear();

        this.state.clear();

        this.nodes.clear();

        this.roots.length = 0;

    }

}