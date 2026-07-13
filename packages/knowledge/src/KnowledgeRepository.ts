import { EngineeringKnowledgeSource } from "./EngineeringKnowledgeSource.js";
import { ProductionDatabase } from "./ProductionDatabase.js";
import { ProductionSource } from "./ProductionSource.js";

export class KnowledgeRepository {

    constructor(

        public readonly production: ProductionSource,

        public readonly productionData: ProductionDatabase,

        public readonly engineering: EngineeringKnowledgeSource

    ) {}

}