export class CommandRegistry {

    private readonly commands = new Map<string, unknown>();

    register<T>(
        name: string,
        command: T
    ): void {

        this.commands.set(name, command);

    }

    has(name: string): boolean {

        return this.commands.has(name);

    }

    get<T>(name: string): T | undefined {

        return this.commands.get(name) as T | undefined;

    }

    remove(name: string): boolean {

        return this.commands.delete(name);

    }

    clear(): void {

        this.commands.clear();

    }

    names(): string[] {

        return [...this.commands.keys()];

    }

}