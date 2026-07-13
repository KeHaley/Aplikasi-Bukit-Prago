import { Relationship } from "./Relationship.js";
import { RelationshipExtractor } from "./RelationshipExtractor.js";
import { RelationshipGraph } from "./RelationshipGraph.js";
import { RelationshipType } from "./RelationshipType.js";

export interface ModuleNode {

    name: string;

    dependencies: readonly string[];

}

export class ModuleRelationshipExtractor implements RelationshipExtractor<readonly ModuleNode[]> {

    extract(

        modules: readonly ModuleNode[],

        graph: RelationshipGraph

    ): void {

        for (const module of modules) {

            for (const dependency of module.dependencies) {

                graph.add(

                    new Relationship(

                        module.name,

                        dependency,

                        RelationshipType.DependsOn

                    )

                );

            }

        }

    }

}