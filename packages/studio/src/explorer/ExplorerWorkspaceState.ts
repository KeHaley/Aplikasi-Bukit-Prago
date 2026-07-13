export class ExplorerWorkspaceState {

    private selected?: string;

    private expanded = new Set<string>();

    setSelected(path: string | undefined): void {

        this.selected = path;

    }

    getSelected(): string | undefined {

        return this.selected;

    }

    setExpanded(paths: readonly string[]): void {

        this.expanded = new Set(paths);

    }

    getExpanded(): readonly string[] {

        return [...this.expanded];

    }

    clear(): void {

        this.selected = undefined;

        this.expanded.clear();

    }

}