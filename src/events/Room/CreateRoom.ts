import {Room} from "../../models/Room";

// @event-message
export type CreateRoomMessage = Pick<Room, "id" | "name" | "type" >

// @event-type
export const CREATE_ROOM = "CREATE_ROOM";
