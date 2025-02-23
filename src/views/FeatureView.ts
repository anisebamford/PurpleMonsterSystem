import {EntityView} from "./EntityView";
import {Feature} from "../models/Feature";
import {Event, CreateFeature, DeleteFeature, UpdateFeature} from "../generated/events";
import {DELETE_FEATURE} from "../events/Feature/DeleteFeature";
import {UPDATE_FEATURE} from "../events/Feature/UpdateFeature";

export class FeatureView extends EntityView<Feature> {

    constructor(event: CreateFeature) {
        super(event.message)
    }

    protected handleDeleteFeature(event: DeleteFeature) {
        this.model.isDeleted = true;
    }

    protected handleUpdateFeature(event: UpdateFeature) {
        this.model = event.message;
    }

    handle(event: Event) {
        if (!this.eventApplies(event)) return;
        switch (event.type) {
            case DELETE_FEATURE:
                this.handleDeleteFeature(event)
                break;
            case UPDATE_FEATURE:
                this.handleUpdateFeature(event)
                break;
            default:
                super.handle(event);
        }
    }
}
