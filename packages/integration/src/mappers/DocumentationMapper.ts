import { DocumentationContract } from "../contracts/DocumentationContract.js";

export class DocumentationMapper {

    map(
        source: readonly DocumentationContract[]
    ): readonly DocumentationContract[] {

        return [...source];

    }

}