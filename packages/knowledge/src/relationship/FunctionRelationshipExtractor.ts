import { Relationship } from "./Relationship.js";
import { RelationshipExtractor } from "./RelationshipExtractor.js";
import { RelationshipGraph } from "./RelationshipGraph.js";
import { RelationshipType } from "./RelationshipType.js";

export interface FunctionNode {

    name: string;

    calls: readonly string[];

}

export class FunctionRelationshipExtractor implements RelationshipExtractor<readonly FunctionNode[]> {

    extract(

        functions: readonly FunctionNode[],

        graph: RelationshipGraph

    ): void {

        for (const fn of functions) {

            for (const target of fn.calls) {

                graph.add(

                    new Relationship(

                        fn.name,

                        target,

                        RelationshipType.Calls

                    )

                );

            }

        }

    }

}