import {Note} from "../../models/Note";
import {Maybe} from "../../models/Maybe";

// @event-type
export const DELETE_ROOM = "DELETE_ROOM"

// @event-message
export type DeleteRoomMessage = Maybe<Note>
