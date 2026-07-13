import { KnowledgeEntity } from "./KnowledgeEntity.js";
import { KnowledgeLocation } from "./KnowledgeLocation.js";

export interface KnowledgeSymbol extends KnowledgeEntity {

    readonly location: KnowledgeLocation;

}