import { AstNode, NodeKind } from "./AstNode";

export class ImportNode implements AstNode {

    readonly kind = NodeKind.Import;

    constructor(
        public readonly name: string,
        public readonly source: string,
        public readonly line: number
    ) {}

}