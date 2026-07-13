import { View } from "./View.js";

export class EditorManager {

    private readonly editors = new Map<string, View>();

    private readonly history: string[] = [];

    private activeEditor?: View;

    open(view: View): void {

        this.editors.set(view.id, view);

        this.activate(view.id);

    }

    close(id: string): boolean {

        if (!this.editors.has(id)) {

            return false;

        }

        this.editors.delete(id);

        this.removeFromHistory(id);

        if (this.activeEditor?.id === id) {

            const previousId = this.history.at(-1);

            this.activeEditor =
                previousId
                    ? this.editors.get(previousId)
                    : undefined;

        }

        return true;

    }

    activate(id: string): boolean {

        const editor = this.editors.get(id);

        if (!editor) {

            return false;

        }

        this.activeEditor = editor;

        this.removeFromHistory(id);

        this.history.push(id);

        return true;

    }

    activatePrevious(): View | undefined {

        if (this.history.length < 2) {

            return this.activeEditor;

        }

        this.history.pop();

        const previousId = this.history.at(-1);

        if (!previousId) {

            return this.activeEditor;

        }

        this.activeEditor = this.editors.get(previousId);

        return this.activeEditor;

    }

    activateNext(): View | undefined {

        return this.activeEditor;
    }

    getActive(): View | undefined {

        return this.activeEditor;

    }

    getEditors(): readonly View[] {

        return [...this.editors.values()];

    }

    getHistory(): readonly string[] {

        return [...this.history];

    }

    has(id: string): boolean {

        return this.editors.has(id);

    }

    clear(): void {

        this.editors.clear();

        this.history.length = 0;

        this.activeEditor = undefined;

    }

    private removeFromHistory(id: string): void {

        const index = this.history.lastIndexOf(id);

        if (index >= 0) {

            this.history.splice(index, 1);

        }

    }

}