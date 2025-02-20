import {FeaturedEntity} from "../../models/Entity";
import {AddFeatureToEntity, DeleteFeature, Event, RemoveFeatureFromEntity, UpdateFeature} from "../../generated/events";
import {EntityView} from "../EntityView";
import {ADD_FEATURE_TO_ENTITY} from "../../events/Feature/AddFeatureToEntity";
import {REMOVE_FEATURE_FROM_ENTITY} from "../../events/Feature/RemoveFeatureFromEntity";
import {UPDATE_FEATURE} from "../../events/Feature/UpdateFeature";
import {DELETE_FEATURE} from "../../events/Feature/DeleteFeature";

type Constructor<TEntity extends FeaturedEntity, T extends EntityView<TEntity> = EntityView<TEntity>> = new (...args: any[]) => T;

export function Featured<T extends Constructor<FeaturedEntity>>(Base: T) {
    return class extends Base {
        protected handleAddFeatureToEntity(event: AddFeatureToEntity) {
            this.innerModel.features.push(event.message)
        }

        protected handleUpdateFeature(event: UpdateFeature) {
            const featureIndex = this.innerModel.features.findIndex(feature => feature.id === event.message.id);
            if (featureIndex >= 0) {
                this.innerModel.features[featureIndex] = event.message;
            }
        }

        protected handleDeleteFeature(event: DeleteFeature) {
            const featureIndex = this.innerModel.features.findIndex(feature => feature.id === event.entityId);
            if (featureIndex >= 0) {
                this.innerModel.features.splice(featureIndex, 1);
            }
        }

        protected handleRemoveFeatureFromEntity(event: RemoveFeatureFromEntity) {
            const featureIndex = this.innerModel.features.findIndex(feature => feature.id === event.message.id)
            if (featureIndex >= 0) {
                this.innerModel.features.splice(featureIndex, 1);
            }
        }

        protected eventApplies<T extends Event>(event: T): boolean {
            return [DELETE_FEATURE, UPDATE_FEATURE].includes(event.type) || super.eventApplies(event)
        }

        handle(event: Event) {
            switch(event.type) {
                case ADD_FEATURE_TO_ENTITY:
                    this.handleAddFeatureToEntity(event);
                    break;
                case REMOVE_FEATURE_FROM_ENTITY:
                    this.handleRemoveFeatureFromEntity(event);
                    break;
                case UPDATE_FEATURE:
                    this.handleUpdateFeature(event);
                    break;
                case DELETE_FEATURE:
                    this.handleDeleteFeature(event);
                    break;
                default:
                    super.handle(event);
            }
        }
    }
}
