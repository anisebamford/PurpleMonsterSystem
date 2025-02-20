import {Entity} from "./Entity";

export interface Note extends Entity {
    timestamp: string,
    userId: string,
    contents: string,
}

export const exampleNote: Note = {
    id: "",
    timestamp: "",
    userId: "",
    contents: "Hello!"
}
