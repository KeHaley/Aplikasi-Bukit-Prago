import {
    DocumentationContract
} from "./contracts/DocumentationContract.js";

import {
    KnowledgeContract
} from "./contracts/KnowledgeContract.js";

import {
    WorkspaceContract
} from "./contracts/WorkspaceContract.js";

import {
    DocumentationMapper
} from "./mappers/DocumentationMapper.js";

import {
    KnowledgeMapper
} from "./mappers/KnowledgeMapper.js";

import {
    WorkspaceMapper
} from "./mappers/WorkspaceMapper.js";

export class IntegrationRuntime {

    private readonly knowledgeMapper =
        new KnowledgeMapper();

    private readonly documentationMapper =
        new DocumentationMapper();

    private readonly workspaceMapper =
        new WorkspaceMapper();

    mapKnowledge(

        source: readonly KnowledgeContract[]

    ): readonly KnowledgeContract[] {

        return this.knowledgeMapper.map(

            source

        );

    }

    mapDocumentation(

        source: readonly DocumentationContract[]

    ): readonly DocumentationContract[] {

        return this.documentationMapper.map(

            source

        );

    }

    mapWorkspace(

        source: readonly KnowledgeContract[]

    ): readonly WorkspaceContract[] {

        return this.workspaceMapper.map(

            source

        );

    }

}