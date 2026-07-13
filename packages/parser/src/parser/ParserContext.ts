import { ProgramNode } from "./ast/ProgramNode";

export class ParserContext {

    constructor(

        public readonly program: ProgramNode,

        public readonly text: string,

        public readonly line: number

    ) {}

}