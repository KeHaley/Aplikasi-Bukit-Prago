import { View } from "./View.js";

export class ViewRegistry {

    private readonly registry = new Map<string, View>();

    register(view: View): void {

        this.registry.set(view.id, view);

    }

    has(id: string): boolean {

        return this.registry.has(id);

    }

    get(id: string): View | undefined {

        return this.registry.get(id);

    }

    remove(id: string): boolean {

        return this.registry.delete(id);

    }

    clear(): void {

        this.registry.clear();

    }

    getViews(): readonly View[] {

        return [...this.registry.values()];

    }

    getViewIds(): readonly string[] {

        return [...this.registry.keys()];

    }

    getCount(): number {

        return this.registry.size;

    }

    isEmpty(): boolean {

        return this.registry.size === 0;

    }

}