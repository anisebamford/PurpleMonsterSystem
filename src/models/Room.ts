import {RoomType} from "./RoomType";
import {Feature} from "./Feature";
import {AnnotatedEntity} from "./Entity";

export interface Room extends AnnotatedEntity {
    id: string,
    name: string,
    isClean: boolean,
    isOccupied: boolean,
    isBlocked: boolean,
    isDeleted: boolean,
    roomType: RoomType,
    description: string,
    features: Feature[],
}
