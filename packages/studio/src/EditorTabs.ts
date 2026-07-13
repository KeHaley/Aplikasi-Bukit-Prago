export class EditorTabs {

    private readonly tabs: string[] = [];

    add(id: string): void {

        if (!this.tabs.includes(id)) {

            this.tabs.push(id);

        }

    }

    remove(id: string): boolean {

        const index = this.tabs.indexOf(id);

        if (index < 0) {

            return false;

        }

        this.tabs.splice(index, 1);

        return true;

    }

    has(id: string): boolean {

        return this.tabs.includes(id);

    }

    getTabs(): readonly string[] {

        return [...this.tabs];

    }

    clear(): void {

        this.tabs.length = 0;

    }

}