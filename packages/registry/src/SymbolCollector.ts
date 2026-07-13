import {
    ProgramNode,
    NodeKind,
    FunctionNode,
    VariableNode,
    ClassNode,
    ImportNode,
    ExportNode
} from "@bpv4/parser";

import { SymbolRegistry } from "./SymbolRegistry.js";
import { Symbol } from "./Symbol.js";
import { SymbolKind } from "./SymbolKind.js";

export class SymbolCollector {

    collect(program: ProgramNode): SymbolRegistry {

        const registry = new SymbolRegistry();

        for (const node of program.children) {

            switch (node.kind) {

                case NodeKind.Function: {

                    const functionNode = node as FunctionNode;

                    registry.add(
                        new Symbol(
                            SymbolKind.Function,
                            functionNode.name,
                            functionNode.line
                        )
                    );

                    break;

                }

                case NodeKind.Variable: {

                    const variableNode = node as VariableNode;

                    registry.add(
                        new Symbol(
                            SymbolKind.Variable,
                            variableNode.name,
                            variableNode.line
                        )
                    );

                    break;

                }

                case NodeKind.Class: {

                    const classNode = node as ClassNode;

                    registry.add(
                        new Symbol(
                            SymbolKind.Class,
                            classNode.name,
                            classNode.line
                        )
                    );

                    break;

                }

                case NodeKind.Import: {

                    const importNode = node as ImportNode;

                    registry.add(
                        new Symbol(
                            SymbolKind.Import,
                            importNode.name,
                            importNode.line
                        )
                    );

                    break;

                }

                case NodeKind.Export: {

                    const exportNode = node as ExportNode;

                    registry.add(
                        new Symbol(
                            SymbolKind.Export,
                            exportNode.name,
                            exportNode.line
                        )
                    );

                    break;

                }

            }

        }

        return registry;

    }

}