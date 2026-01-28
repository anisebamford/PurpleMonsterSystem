import {Feature} from "../../models/Feature";
import {PartialEntity} from "../../models";

// @event-type
export const UPDATE_FEATURE = "UPDATE_FEATURE";

// @event-message
export type UpdateFeatureMessage = PartialEntity<Feature>;