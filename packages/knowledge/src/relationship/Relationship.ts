import { RelationshipType } from "./RelationshipType.js";

export class Relationship {

    constructor(

        public readonly from: string,

        public readonly to: string,

        public readonly type: RelationshipType

    ) {}

}