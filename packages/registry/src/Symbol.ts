import { SymbolKind } from "./SymbolKind";

export class Symbol {

    constructor(

        public readonly kind: SymbolKind,

        public readonly name: string,

        public readonly line: number

    ) {}

}