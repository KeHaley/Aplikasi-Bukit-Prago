import { ExportNode } from "../ast/ExportNode";

export class ExportParser {

    parse(
        text: string,
        line: number
    ): ExportNode | null {

        if (!text.startsWith("export ")) {
            return null;
        }

        const afterKeyword =
            text.substring("export ".length).trim();

        const parts = afterKeyword.split(/\s+/);

        if (parts.length < 2) {
            return null;
        }

        const name = parts[1];

        if (name.length === 0) {
            return null;
        }

        return new ExportNode(
            name,
            line
        );

    }

}