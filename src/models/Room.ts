import {ROOM_TYPE, RoomTypeRef} from "./RoomType";
import {Feature} from "./Feature";
import {AnnotatedEntity} from "./Entity";

export interface Room extends AnnotatedEntity {
    id: string,
    name: string,
    isClean: boolean,
    isOccupied: boolean,
    isBlocked: boolean,
    isDeleted: boolean,
    type: RoomTypeRef,
    description: string,
    features: Feature[],
}
