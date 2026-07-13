import { ImportNode } from "../ast/ImportNode";

export class ImportParser {

    parse(
        text: string,
        line: number
    ): ImportNode | null {

        if (!text.startsWith("import ")) {
            return null;
        }

        const fromIndex = text.indexOf(" from ");

        if (fromIndex < 0) {
            return null;
        }

        const importPart =
            text.substring(
                "import ".length,
                fromIndex
            ).trim();

        const sourcePart =
            text.substring(
                fromIndex + " from ".length
            ).trim();

        const name =
            importPart
                .replace("{", "")
                .replace("}", "")
                .trim();

        const source =
            sourcePart
                .replace(/['"]/g, "")
                .replace(/;$/, "");

        if (
            name.length === 0 ||
            source.length === 0
        ) {
            return null;
        }

        return new ImportNode(
            name,
            source,
            line
        );

    }

}