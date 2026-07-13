export class ExplorerSelection {

    private selected?: string;

    select(path: string): void {

        this.selected = path;

    }

    clear(): void {

        this.selected = undefined;

    }

    hasSelection(): boolean {

        return this.selected !== undefined;

    }

    getSelection(): string | undefined {

        return this.selected;

    }

}