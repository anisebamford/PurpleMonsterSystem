import {Entity} from "./Entity";

export type Maybe<T> = T | null | undefined;
export type PartialEntity<T extends Entity> = Pick<Entity, "id"> & Partial<T>