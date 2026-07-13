import { View } from "./View.js";

export class WorkspaceUI {

    private readonly views: View[] = [];

    register(view: View): void {

        this.views.push(view);

    }

    getViews(): readonly View[] {

        return this.views;

    }

}