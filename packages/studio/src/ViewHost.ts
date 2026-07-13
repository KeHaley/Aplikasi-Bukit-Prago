import { View } from "./View.js";

export class ViewHost {

    private activeView?: View;

    setActiveView(view: View): void {

        this.activeView = view;

    }

    getActiveView(): View | undefined {

        return this.activeView;

    }

    isActive(id: string): boolean {

        return this.activeView?.id === id;

    }

    hasActiveView(): boolean {

        return this.activeView !== undefined;

    }

    clear(): void {

        this.activeView = undefined;

    }

}