import { KnowledgeContract } from "../contracts/KnowledgeContract.js";
import { WorkspaceContract } from "../contracts/WorkspaceContract.js";

export class WorkspaceAdapter {

    adapt(

        knowledge: readonly KnowledgeContract[]

    ): readonly WorkspaceContract[] {

        return knowledge.map(

            item => ({

                id: item.id,

                name: item.name,

                type: item.category

            })

        );

    }

}