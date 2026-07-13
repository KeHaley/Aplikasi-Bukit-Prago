import { AstNode } from "../ast/AstNode";
import { FunctionParser } from "./FunctionParser";
import { VariableParser } from "./VariableParser";
import { ClassParser } from "./ClassParser";
import { ImportParser } from "./ImportParser";
import { ExportParser } from "./ExportParser";

export class DeclarationParser {

    private readonly functionParser = new FunctionParser();

    private readonly variableParser = new VariableParser();

    private readonly classParser = new ClassParser();

    private readonly importParser = new ImportParser();

    private readonly exportParser = new ExportParser();

    parse(
        text: string,
        line: number
    ): AstNode | null {

        const functionNode =
            this.functionParser.parse(
                text,
                line
            );

        if (functionNode) {
            return functionNode;
        }

        const variableNode =
            this.variableParser.parse(
                text,
                line
            );

        if (variableNode) {
            return variableNode;
        }

        const classNode =
            this.classParser.parse(
                text,
                line
            );

        if (classNode) {
            return classNode;
        }

        const importNode =
            this.importParser.parse(
                text,
                line
            );

        if (importNode) {
            return importNode;
        }

        const exportNode =
            this.exportParser.parse(
                text,
                line
            );

        if (exportNode) {
            return exportNode;
        }

        return null;

    }

}