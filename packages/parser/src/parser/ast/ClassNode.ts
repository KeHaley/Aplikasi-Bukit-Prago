import { AstNode, NodeKind } from "./AstNode";

export class ClassNode implements AstNode {

    readonly kind = NodeKind.Class;

    constructor(
        public readonly name: string,
        public readonly line: number
    ) {}

}