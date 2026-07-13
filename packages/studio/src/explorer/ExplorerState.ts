export class ExplorerState {

    private expanded = new Set<string>();

    expand(path: string): void {

        this.expanded.add(path);

    }

    collapse(path: string): void {

        this.expanded.delete(path);

    }

    isExpanded(path: string): boolean {

        return this.expanded.has(path);

    }

    clear(): void {

        this.expanded.clear();

    }

    getExpanded(): readonly string[] {

        return [...this.expanded];

    }

}