import {Event} from "../generated/events"

export class View<T> {
    constructor(protected innerModel: T) {}

    public handle(event: Event): void {
    }

    protected eventApplies(event: Event): boolean {
        return false;
    }

    public get model() {
        return this.innerModel;
    }
}
