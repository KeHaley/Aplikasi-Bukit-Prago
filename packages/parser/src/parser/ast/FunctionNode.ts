import { AstNode, NodeKind } from "./AstNode";

export class FunctionNode implements AstNode {

    readonly kind = NodeKind.Function;

    constructor(
        public readonly name: string,
        public readonly line: number
    ) {}

}