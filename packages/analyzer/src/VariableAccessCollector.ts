import { SourceLine } from "@bpv4/parser";

import { Dependency } from "./Dependency.js";
import { DependencyKind } from "./DependencyKind.js";
import { DependencyRegistry } from "./DependencyRegistry.js";
import { FunctionScope } from "./FunctionScope.js";
import { FunctionScopeFinder } from "./FunctionScopeFinder.js";

export class VariableAccessCollector {

    private readonly scopeFinder =
        new FunctionScopeFinder();

    collect(lines: SourceLine[]): DependencyRegistry {

        const registry = new DependencyRegistry();

        const scopes =
            this.scopeFinder.find(lines);

        for (const scope of scopes) {

            this.collectScope(
                scope,
                lines,
                registry
            );

        }

        return registry;

    }

    private collectScope(

    scope: FunctionScope,

    lines: SourceLine[],

    registry: DependencyRegistry

): void {

const visited = new Set<string>();
        for (const line of lines) {

            if (
                line.line < scope.startLine ||
                line.line > scope.endLine
            ) {

                continue;

            }

             this.collectLine(
                        scope,
                         line,
                     registry,
                       visited
              );

        }

    }

    private collectLine(

    scope: FunctionScope,

    line: SourceLine,

    registry: DependencyRegistry,

    visited: Set<string>

): void {

        let identifiers =
            this.extractIdentifiers(line.text);

        identifiers =
            this.removeDeclaredVariable(
                line.text,
                identifiers
            );

        for (const identifier of identifiers) {

            if (this.isKeyword(identifier)) {

                continue;

            }

            if (
                this.isFunctionDeclaration(
                    line.text
                )
            ) {

                continue;

            }

            if (
                this.isFunctionCall(
                    line.text,
                    identifier
                )
            ) {

                continue;

            }

const key =
    scope.name + ":" + identifier;

if (visited.has(key)) {

    continue;

}

visited.add(key);

registry.add(

    new Dependency(

                    DependencyKind.VariableAccess,
                    scope.name,
                    identifier,
                    line.line

                )

            );

        }

    }

    private extractIdentifiers(

        text: string

    ): string[] {

        const matches =
            text.match(/[A-Za-z_$][A-Za-z0-9_$]*/g);

        if (!matches) {

            return [];

        }

        return matches;
        }
    private isKeyword(

        value: string

    ): boolean {

        switch (value) {

            case "function":
            case "return":
            case "const":
            case "let":
            case "var":
            case "if":
            case "else":
            case "for":
            case "while":
            case "do":
            case "switch":
            case "case":
            case "break":
            case "continue":
            case "default":
            case "new":
            case "class":
            case "extends":
            case "import":
            case "export":
            case "from":
            case "await":
            case "async":
            case "try":
            case "catch":
            case "finally":
            case "throw":
            case "this":
            case "super":
            case "true":
            case "false":
            case "null":
            case "undefined":

                return true;

            default:

                return false;

        }

    }

    private isFunctionDeclaration(

        text: string

    ): boolean {

        return text
            .trim()
            .startsWith("function ");

    }

    private isFunctionCall(

        line: string,
        identifier: string

    ): boolean {

        return line.includes(
            identifier + "("
        );

    }

    private removeDeclaredVariable(

        line: string,
        identifiers: string[]

    ): string[] {

        const match =
            line.match(
                /^\s*(const|let|var)\s+([A-Za-z_$][A-Za-z0-9_$]*)/
            );

        if (!match) {

            return identifiers;

        }

        return identifiers.filter(
            identifier => identifier !== match[2]
        );

    }

}
    