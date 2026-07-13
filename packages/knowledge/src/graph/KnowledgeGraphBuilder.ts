import { KnowledgeCatalog } from "../catalog/KnowledgeCatalog.js";
import { RelationshipGraph } from "../relationship/RelationshipGraph.js";

import { KnowledgeEdge } from "./KnowledgeEdge.js";
import { KnowledgeGraph } from "./KnowledgeGraph.js";
import { KnowledgeNode } from "./KnowledgeNode.js";

export class KnowledgeGraphBuilder {

    build(

        catalog: KnowledgeCatalog,

        relationships: RelationshipGraph

    ): KnowledgeGraph {

        const graph =
            new KnowledgeGraph();

        for (const artifact of catalog.getArtifacts()) {

            graph.addNode(

                new KnowledgeNode(

                    artifact.id,

                    artifact.category,

                    artifact.name

                )

            );

        }

        for (const relationship of relationships.getRelationships()) {

            graph.addEdge(

                new KnowledgeEdge(

                    relationship.from,

                    relationship.to,

                    relationship.type

                )

            );

        }

        return graph;

    }

}