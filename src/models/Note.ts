import {Entity} from "./Entity";

export type NoteState = "published" | "deleted"

export interface Note extends Entity {
    timestamp: string,
    userId: string,
    message: string,
    state: NoteState
}
