import { KnowledgeContract } from "../contracts/KnowledgeContract.js";

export class KnowledgeMapper {

    map(
        source: readonly KnowledgeContract[]
    ): readonly KnowledgeContract[] {

        return [...source];

    }

}