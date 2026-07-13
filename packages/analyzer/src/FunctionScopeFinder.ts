import { SourceLine } from "@bpv4/parser";
import { FunctionScope } from "./FunctionScope.js";

export class FunctionScopeFinder {

    find(lines: SourceLine[]): FunctionScope[] {

        const scopes: FunctionScope[] = [];

        let currentName = "";
        let startLine = 0;

        let braceDepth = 0;

        let insideFunction = false;

        for (const line of lines) {

            const text = line.text.trim();

            if (!insideFunction && text.startsWith("function ")) {

                const afterKeyword =
                    text.substring("function ".length);

                const bracket =
                    afterKeyword.indexOf("(");

                currentName =
                    bracket >= 0
                        ? afterKeyword.substring(0, bracket).trim()
                        : afterKeyword.trim();

                startLine = line.line;

                insideFunction = true;

            }

            for (const ch of text) {

                if (ch === "{") {

                    braceDepth++;

                }

                if (ch === "}") {

                    braceDepth--;

                    if (insideFunction && braceDepth === 0) {

                        scopes.push(

                            new FunctionScope(

                                currentName,

                                startLine,

                                line.line

                            )

                        );

                        insideFunction = false;

                    }

                }

            }

        }

        return scopes;

    }

}