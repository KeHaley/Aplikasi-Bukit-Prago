import { Symbol } from "./Symbol";

export class SymbolRegistry {

    private readonly symbols: Symbol[] = [];

    add(symbol: Symbol): void {

        this.symbols.push(symbol);

    }

    getAll(): readonly Symbol[] {

        return this.symbols;

    }

    count(): number {

        return this.symbols.length;

    }

}