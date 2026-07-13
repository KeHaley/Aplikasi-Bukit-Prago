import { AstNode, NodeKind } from "./AstNode";

export type VariableKind =
    | "const"
    | "let"
    | "var";

export class VariableNode implements AstNode {

    readonly kind = NodeKind.Variable;

    constructor(
        public readonly declaration: VariableKind,
        public readonly name: string,
        public readonly line: number
    ) {}

}