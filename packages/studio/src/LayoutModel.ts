export class LayoutModel {

    private readonly layouts = new Map<string, unknown>();

    register<T>(
        name: string,
        layout: T
    ): void {

        this.layouts.set(name, layout);

    }

    has(name: string): boolean {

        return this.layouts.has(name);

    }

    get<T>(name: string): T | undefined {

        return this.layouts.get(name) as T | undefined;

    }

    remove(name: string): boolean {

        return this.layouts.delete(name);

    }

    clear(): void {

        this.layouts.clear();

    }

    names(): string[] {

        return [...this.layouts.keys()];

    }

}