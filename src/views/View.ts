import {Event} from "../generated/events"

export class View<T> {
    constructor(protected model: T) {}

    public handle(event: Event): void {
    }

    protected eventApplies(event: Event): boolean {
        return false;
    }
}
