import { AstNode, NodeKind } from "./AstNode";

export class ProgramNode implements AstNode {

    readonly kind = NodeKind.Program;

    readonly line = 0;

    readonly children: AstNode[] = [];

    add(node: AstNode): void {
        this.children.push(node);
    }

}