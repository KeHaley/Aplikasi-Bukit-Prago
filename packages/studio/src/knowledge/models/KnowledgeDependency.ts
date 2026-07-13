import { KnowledgeEntity } from "./KnowledgeEntity.js";

export interface KnowledgeDependency extends KnowledgeEntity {

    readonly sourceId: string;

    readonly targetId: string;

}