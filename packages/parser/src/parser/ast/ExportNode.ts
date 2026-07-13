import { AstNode, NodeKind } from "./AstNode";

export class ExportNode implements AstNode {

    readonly kind = NodeKind.Export;

    constructor(
        public readonly name: string,
        public readonly line: number
    ) {}

}