export enum NodeKind {
    Program = "Program",
    Function = "Function",
    Variable = "Variable",
    Class = "Class",
    Import = "Import",
    Export = "Export"
}

export interface AstNode {
    kind: NodeKind;
    line: number;
}