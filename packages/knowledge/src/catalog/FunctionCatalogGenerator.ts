import { CatalogArtifact } from "./CatalogArtifact.js";

export interface FunctionCatalogSource {

    name: string;

    file: string;

    signature?: string;

}

export class FunctionCatalogGenerator {

    generate(

        functions: readonly FunctionCatalogSource[]

    ): CatalogArtifact[] {

        return functions.map(

            (fn, index) =>

                new CatalogArtifact(

                    `FUNCTION-${String(index + 1).padStart(4, "0")}`,

                    fn.name,

                    "Function",

                    fn.file,

                    fn.signature ?? ""

                )

        );

    }

}