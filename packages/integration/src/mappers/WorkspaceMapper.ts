import { KnowledgeContract } from "../contracts/KnowledgeContract.js";
import { WorkspaceContract } from "../contracts/WorkspaceContract.js";

export class WorkspaceMapper {

    map(
        source: readonly KnowledgeContract[]
    ): readonly WorkspaceContract[] {

        return source.map(item => ({

            id: item.id,

            name: item.name,

            type: item.category

        }));

    }

}