import { Document } from "./Document.js";

export class DocumentGenerator {

    generate(

        title: string,

        content: string

    ): Document {

        return new Document(

            title,

            content

        );

    }

}