import { SourceLine } from "@bpv4/parser";

import { Dependency } from "./Dependency.js";
import { DependencyKind } from "./DependencyKind.js";
import { DependencyRegistry } from "./DependencyRegistry.js";
import { FunctionScopeFinder } from "./FunctionScopeFinder.js";

export class DependencyCollector {

    private readonly finder = new FunctionScopeFinder();

    collect(lines: SourceLine[]): DependencyRegistry {

        const registry = new DependencyRegistry();

        const scopes = this.finder.find(lines);

        for (const scope of scopes) {

            for (const line of lines) {

                if (
                    line.line < scope.startLine ||
                    line.line > scope.endLine
                ) {
                    continue;
                }

                const text = line.text.trim();

                /*
                 * ---------------------------------------------
                 * METHOD CALL
                 * db.save()
                 * logger.info()
                 * this.render()
                 * super.render()
                 * ---------------------------------------------
                 */

                const methodMatches =
                    text.matchAll(
                        /\b([A-Za-z_][A-Za-z0-9_]*|this|super)\.([A-Za-z_][A-Za-z0-9_]*)\s*\(/g
                    );

                const methodNames = new Set<string>();

                for (const match of methodMatches) {

                    const target =
                        `${match[1]}.${match[2]}`;

                    methodNames.add(match[2]);

                    registry.add(

                        new Dependency(

                            DependencyKind.MethodCall,

                            scope.name,

                            target,

                            line.line

                        )

                    );

                }

                /*
                 * ---------------------------------------------
                 * FUNCTION CALL
                 * save()
                 * update()
                 * await save()
                 * ---------------------------------------------
                 */

                const functionMatches =
                    text.matchAll(
                        /\b([A-Za-z_][A-Za-z0-9_]*)\s*\(/g
                    );

                for (const match of functionMatches) {

                    const target = match[1];

                    if (
                        target === "function" ||
                        target === "if" ||
                        target === "for" ||
                        target === "while" ||
                        target === "switch" ||
                        target === "catch" ||
                        target === "return" ||
                        target === "await"
                    ) {
                        continue;
                    }

                    if (target === scope.name) {
                        continue;
                    }

                    /*
                     * save pada db.save()
                     * sudah diproses sebagai MethodCall
                     */

                    if (methodNames.has(target)) {
                        continue;
                    }

                    registry.add(

                        new Dependency(

                            DependencyKind.FunctionCall,

                            scope.name,

                            target,

                            line.line

                        )

                    );

                }

            }

        }

        return registry;

    }

}