import {Entity} from "../models/Entity";
import {View} from "./View";
import {Event} from "../generated/events";

export class EntityView<T extends Entity> extends View<T> {
    protected eventApplies<T extends Event>(event: T): boolean {
        return this.innerModel.id === event.entityId || super.eventApplies(event);
    }
}
