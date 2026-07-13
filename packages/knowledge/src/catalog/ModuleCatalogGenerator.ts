import { basename } from "node:path";

import { ApplicationProfile } from "../ApplicationProfile.js";
import { CatalogArtifact } from "./CatalogArtifact.js";

export class ModuleCatalogGenerator {

    generate(

        profile: ApplicationProfile

    ): CatalogArtifact[] {

        return profile.inventory.sourceFiles.map((file, index) =>

            new CatalogArtifact(

                `MODULE-${String(index + 1).padStart(4, "0")}`,

                basename(file.path),

                "Module",

                file.path,

                file.type

            )

        );

    }

}