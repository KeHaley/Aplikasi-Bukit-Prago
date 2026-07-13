import { FunctionNode } from "../ast/FunctionNode";

export class FunctionParser {

    isFunction(text: string): boolean {

        return text.startsWith("function ");

    }

    parse(
        text: string,
        line: number
    ): FunctionNode | null {

        if (!this.isFunction(text)) {
            return null;
        }

        const afterKeyword =
            text.substring("function ".length);

        const openParen =
            afterKeyword.indexOf("(");

        if (openParen < 0) {
            return null;
        }

        const name =
            afterKeyword.substring(0, openParen).trim();

        if (name.length === 0) {
            return null;
        }

        return new FunctionNode(
            name,
            line
        );

    }

}