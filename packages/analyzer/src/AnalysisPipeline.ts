import { Project } from "@bpv4/project";
import { Tokenizer, Parser } from "@bpv4/parser";
import { SymbolCollector } from "@bpv4/registry";

import { DependencyRegistry } from "./DependencyRegistry.js";
import { DependencyCollector } from "./DependencyCollector.js";
import { VariableAccessCollector } from "./VariableAccessCollector.js";
import { ImportDependencyCollector } from "./ImportDependencyCollector.js";

import { CallGraphCollector } from "./CallGraphCollector.js";
import { CrossFileDependencyCollector } from "./CrossFileDependencyCollector.js";
import { DataFlowCollector } from "./DataFlowCollector.js";

import { EngineeringKnowledgeBuilder } from "./EngineeringKnowledgeBuilder.js";
import { EngineeringReportBuilder } from "./EngineeringReportBuilder.js";

import { AnalysisResult } from "./AnalysisResult.js";

export class AnalysisPipeline {

    analyze(project: Project): AnalysisResult {

        const tokenizer = new Tokenizer();

        const parser = new Parser();

        const symbolCollector =
            new SymbolCollector();

        const dependencyCollector =
            new DependencyCollector();

        const variableAccessCollector =
            new VariableAccessCollector();

        const importDependencyCollector =
            new ImportDependencyCollector();

        const callGraphCollector =
            new CallGraphCollector();

        const crossFileCollector =
            new CrossFileDependencyCollector();

        const dataFlowCollector =
            new DataFlowCollector();

        const dependencyRegistry =
            new DependencyRegistry();

        let parsedFiles = 0;

        let symbolCount = 0;

        for (const file of project.files) {

            if (file.content.length === 0) {

                continue;

            }

            const lines =
                tokenizer.tokenize(file.content);

            const program =
                parser.parse(lines);

            const symbols =
                symbolCollector.collect(program);

            symbolCount += symbols.count();

            dependencyRegistry.addAll(
                dependencyCollector
                    .collect(lines)
                    .getAll()
            );

            dependencyRegistry.addAll(
                variableAccessCollector
                    .collect(lines)
                    .getAll()
            );

            dependencyRegistry.addAll(
                importDependencyCollector
                    .collect(program)
                    .getAll()
            );

            parsedFiles++;

        }
                callGraphCollector.collect(
            dependencyRegistry.getAll()
        );

        crossFileCollector.collect(
            dependencyRegistry
        );

        dataFlowCollector.collect(
            dependencyRegistry.getAll()
        );

        const knowledge =
            new EngineeringKnowledgeBuilder().build(

                dependencyRegistry,

                callGraphCollector.getAll(),

                crossFileCollector.getAll(),

                dataFlowCollector.getAll()

            );

        const report =
            new EngineeringReportBuilder().build(
                knowledge
            );

        return {

            parsedFiles,

            symbolCount,

            dependencyCount:
                knowledge.dependencyCount(),

            callGraphCount:
                knowledge.callGraphCount(),

            crossFileCount:
                knowledge.crossFileCount(),

            dataFlowCount:
                knowledge.dataFlowCount(),

            knowledge,

            report

        };

    }

}