import { ClassNode } from "../ast/ClassNode";

export class ClassParser {

    parse(
        text: string,
        line: number
    ): ClassNode | null {

        if (!text.startsWith("class ")) {
            return null;
        }

        const afterKeyword =
            text.substring("class ".length);

        const brace =
            afterKeyword.indexOf("{");

        const name =
            brace >= 0
                ? afterKeyword.substring(0, brace).trim()
                : afterKeyword.trim();

        if (name.length === 0) {
            return null;
        }

        return new ClassNode(
            name,
            line
        );

    }

}