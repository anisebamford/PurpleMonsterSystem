import {Maybe} from "../../models/Maybe";
import {Note} from "../../models/Note";

// @event-type
export const BLOCK_ROOM = "BLOCK_ROOM"

// @event-message
export type BlockRoomMessage = Maybe<Note>
