import {Feature} from "../../models/Feature";

// @event-type
export const REMOVE_FEATURE_FROM_ENTITY = "REMOVE_FEATURE_FROM_ENTITY";

// @event-message
export type RemoveFeatureFromEntityMessage = Pick<Feature, "id">