export class ModuleRegistry {

    private readonly modules = new Map<string, unknown>();

    register<T>(
        name: string,
        module: T
    ): void {

        this.modules.set(name, module);

    }

    has(name: string): boolean {

        return this.modules.has(name);

    }

    get<T>(name: string): T | undefined {

        return this.modules.get(name) as T | undefined;

    }

    remove(name: string): boolean {

        return this.modules.delete(name);

    }

    clear(): void {

        this.modules.clear();

    }

    names(): string[] {

        return [...this.modules.keys()];

    }

}