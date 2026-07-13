import { Project, SourceFile } from "@bpv4/project";
import { SourceLine, ProgramNode } from "@bpv4/parser";
import { SymbolRegistry } from "@bpv4/registry";

import { DependencyRegistry } from "./DependencyRegistry.js";

export class AnalysisContext {

    constructor(

        public readonly project: Project,

        public readonly sourceFile: SourceFile,

        public readonly sourceLines: SourceLine[],

        public readonly program: ProgramNode,

        public readonly symbols: SymbolRegistry,

        public readonly dependencies: DependencyRegistry

    ) {}

}