import { DocumentationContract } from "../contracts/DocumentationContract.js";

export interface DocumentationSource {

    readonly title: string;

}

export class DocumentationAdapter {

    adapt(

        source: DocumentationSource,

        path: string,

        category: string

    ): DocumentationContract {

        return {

            title: source.title,

            path,

            category

        };

    }

}