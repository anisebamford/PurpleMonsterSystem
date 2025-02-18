import {Note} from "../../models/Note";

// @event-type
export const DELETE_NOTE = "DELETE_NOTE";

// @event-message
export type DeleteNoteMessage = Pick<Note, "id">
