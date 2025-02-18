import {Room} from "../../models/Room";

// @event-type
export const DESCRIBE_ROOM = "DESCRIBE_ROOM";

// @event-message
export type DescribeRoomMessage = Pick<Room, "description">
