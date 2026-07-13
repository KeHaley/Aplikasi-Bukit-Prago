import { KnowledgeEdge } from "./KnowledgeEdge.js";
import { KnowledgeNode } from "./KnowledgeNode.js";

export class KnowledgeGraph {

    private readonly nodes: KnowledgeNode[] = [];

    private readonly edges: KnowledgeEdge[] = [];

    addNode(

        node: KnowledgeNode

    ): void {

        this.nodes.push(node);

    }

    addEdge(

        edge: KnowledgeEdge

    ): void {

        this.edges.push(edge);

    }

    getNodes(): readonly KnowledgeNode[] {

        return this.nodes;

    }

    getEdges(): readonly KnowledgeEdge[] {

        return this.edges;

    }

    nodeCount(): number {

        return this.nodes.length;

    }

    edgeCount(): number {

        return this.edges.length;

    }

}