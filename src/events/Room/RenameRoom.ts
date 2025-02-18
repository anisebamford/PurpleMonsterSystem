import {Room} from "../../models/Room";

// @event-type
export const RENAME_ROOM = "RENAME_ROOM";

// @event-message
export type RenameRoomMessage = Pick<Room, "name">
