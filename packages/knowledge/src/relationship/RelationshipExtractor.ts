import { RelationshipGraph } from "./RelationshipGraph.js";

export interface RelationshipExtractor<T> {

    extract(

        source: T,

        graph: RelationshipGraph

    ): void;

}