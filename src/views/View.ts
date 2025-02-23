import {Event} from "../generated/events"

export class View<T> {
    constructor(public model: T) {}

    public handle(event: Event): void {
    }

    protected eventApplies(event: Event): boolean {
        return false;
    }

    // @deprecated
    public get innerModel() {
        return this.model;
    }
}
