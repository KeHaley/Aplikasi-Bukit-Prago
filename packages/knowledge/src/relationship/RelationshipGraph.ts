import { Relationship } from "./Relationship.js";

export class RelationshipGraph {

    private readonly relationships: Relationship[] = [];

    add(

        relationship: Relationship

    ): void {

        this.relationships.push(relationship);

    }

    addRange(

        relationships: readonly Relationship[]

    ): void {

        this.relationships.push(...relationships);

    }

    getRelationships(): readonly Relationship[] {

        return this.relationships;

    }

    count(): number {

        return this.relationships.length;

    }

}