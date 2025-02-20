import {Feature} from "./Feature";

export type RoomType = {
    id: string,
    name: string,
    description: string,
    features: Feature[]
}

export const ROOM_TYPE = "ROOM_TYPE";

export type RoomTypeRef = {
    id: string,
    type: typeof ROOM_TYPE
}