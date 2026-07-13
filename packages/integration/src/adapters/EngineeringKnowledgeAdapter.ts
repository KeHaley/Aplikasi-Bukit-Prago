import { KnowledgeContract } from "../contracts/KnowledgeContract.js";

export interface EngineeringKnowledgeSource {

    readonly dependencies: readonly {

        readonly id: string;

        readonly name: string;

        readonly category: string;

        readonly summary: string;

    }[];

}

export class EngineeringKnowledgeAdapter {

    adapt(

        source: EngineeringKnowledgeSource

    ): readonly KnowledgeContract[] {

        return source.dependencies.map(

            dependency => ({

                id: dependency.id,

                category: dependency.category,

                name: dependency.name,

                summary: dependency.summary

            })

        );

    }

}