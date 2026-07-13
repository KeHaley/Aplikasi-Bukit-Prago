import { VariableNode, VariableKind } from "../ast/VariableNode";

export class VariableParser {

    parse(
        text: string,
        line: number
    ): VariableNode | null {

        const declarations: VariableKind[] = [
            "const",
            "let",
            "var"
        ];

        for (const declaration of declarations) {

            const prefix = declaration + " ";

            if (!text.startsWith(prefix)) {
                continue;
            }

            const afterKeyword = text.substring(prefix.length);

            const equalIndex = afterKeyword.indexOf("=");

            const variableName =
                equalIndex >= 0
                    ? afterKeyword.substring(0, equalIndex).trim()
                    : afterKeyword.trim();

            if (variableName.length === 0) {
                return null;
            }

            return new VariableNode(
                declaration,
                variableName,
                line
            );

        }

        return null;

    }

}