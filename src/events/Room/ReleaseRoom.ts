import { Maybe } from "../../models/Maybe";
import {Note} from "../../models/Note";

// @event-type
export const RELEASE_ROOM = "RELEASE_ROOM";

// @event-message
export type ReleaseRoomMessage = Maybe<Note>
