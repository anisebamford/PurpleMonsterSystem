import {Maybe} from "../../models/Maybe";
import {Note} from "../../models/Note";

// @event-type
export const DIRTY_ROOM = "DIRTY_ROOM"

// @event-message
export type DirtyRoomMessage = Maybe<Note>
