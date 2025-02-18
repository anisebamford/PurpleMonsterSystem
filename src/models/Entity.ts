import {Note} from "./Note";
import {Feature} from "./Feature";

export interface Entity {
    id: string;
}

export interface AnnotatedEntity extends Entity {
    notes: Note[];
}

export interface FeaturedEntity extends Entity {
    features: Feature[];
}