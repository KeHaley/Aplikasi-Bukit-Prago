import { Relationship } from "./Relationship.js";
import { RelationshipExtractor } from "./RelationshipExtractor.js";
import { RelationshipGraph } from "./RelationshipGraph.js";
import { RelationshipType } from "./RelationshipType.js";

export interface DataNode {

    name: string;

    references: readonly string[];

}

export class DataRelationshipExtractor implements RelationshipExtractor<readonly DataNode[]> {

    extract(

        datasets: readonly DataNode[],

        graph: RelationshipGraph

    ): void {

        for (const dataset of datasets) {

            for (const reference of dataset.references) {

                graph.add(

                    new Relationship(

                        dataset.name,

                        reference,

                        RelationshipType.References

                    )

                );

            }

        }

    }

}