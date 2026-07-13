export class NavigationModel {

    private readonly items = new Map<string, unknown>();

    register<T>(
        name: string,
        item: T
    ): void {

        this.items.set(name, item);

    }

    has(name: string): boolean {

        return this.items.has(name);

    }

    get<T>(name: string): T | undefined {

        return this.items.get(name) as T | undefined;

    }

    remove(name: string): boolean {

        return this.items.delete(name);

    }

    clear(): void {

        this.items.clear();

    }

    names(): string[] {

        return [...this.items.keys()];

    }

}