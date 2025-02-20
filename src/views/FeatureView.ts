import {EntityView} from "./EntityView";
import {Feature} from "../models/Feature";
import {Event, CreateFeature, DeleteFeature} from "../generated/events";
import {DELETE_FEATURE} from "../events/Feature/DeleteFeature";

export class FeatureView extends EntityView<Feature> {

    constructor(event: CreateFeature) {
        super(event.message)
    }

    protected handleDeleteFeature(event: DeleteFeature) {
        this.innerModel.isDeleted = true;
    }

    handle(event: Event) {
        if (!this.eventApplies(event)) return;
        switch (event.type) {
            case DELETE_FEATURE:
                this.handleDeleteFeature(event)
                break;
        }
    }
}