export class ServiceContainer {

    private readonly services = new Map<string, unknown>();

    register<T>(
        name: string,
        service: T
    ): void {

        this.services.set(name, service);

    }

    has(name: string): boolean {

        return this.services.has(name);

    }

    resolve<T>(name: string): T | undefined {

        return this.services.get(name) as T | undefined;

    }

    remove(name: string): boolean {

        return this.services.delete(name);

    }

    clear(): void {

        this.services.clear();

    }

}