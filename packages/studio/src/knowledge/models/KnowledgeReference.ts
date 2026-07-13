import { KnowledgeEntity } from "./KnowledgeEntity.js";
import { KnowledgeLocation } from "./KnowledgeLocation.js";

export interface KnowledgeReference extends KnowledgeEntity {

    readonly sourceId: string;

    readonly targetId: string;

    readonly location: KnowledgeLocation;

}