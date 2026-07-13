import { SourceLine } from "../tokenizer/Tokenizer";
import { ProgramNode } from "./ast/ProgramNode";
import { DeclarationParser } from "./declarations/DeclarationParser";

export class Parser {

    private readonly declarationParser = new DeclarationParser();

    parse(lines: SourceLine[]): ProgramNode {

        const program = new ProgramNode();

        for (const line of lines) {

            const text = line.text.trim();

            const node = this.declarationParser.parse(
                text,
                line.line
            );

            if (node) {

                program.add(node);

            }

        }

        return program;

    }

}