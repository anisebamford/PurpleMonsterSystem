import {AddNoteToEntity, DeleteNote, Event, UpdateNote} from "../../generated/events";
import {View} from "../View";
import {AnnotatedEntity} from "../../models/Entity";
import {DELETE_NOTE} from "../../events/Note/DeleteNote";
import {ADD_NOTE_TO_ENTITY} from "../../events/Note/AddNoteToEntity";
import {UPDATE_NOTE} from "../../events/Note/UpdateNote";

type Constructor<TEntity extends AnnotatedEntity, T extends View<TEntity> = View<TEntity>> = new (...args: any[]) => T;

export function Annotated<T extends Constructor<AnnotatedEntity>>(Base: T) {
    return class extends Base {
        protected handleAddNoteToEntity(event: AddNoteToEntity): void {
            this.innerModel.notes.push(event.message);
        }

        protected handleDeleteNote(event: DeleteNote): void {
            const noteIndex = this.innerModel.notes.findIndex((note) => note.id === event.message.id)
            if (noteIndex >= 0) {
                this.innerModel.notes.splice(noteIndex, 1)
            }
        }

        protected handleUpdateNote(event: UpdateNote): void {
            const noteIndex = this.innerModel.notes.findIndex((note) => note.id === event.message.id)
            if (noteIndex >= 0) {
                this.innerModel.notes[noteIndex] = event.message;
            }
        }

        protected eventApplies(event: Event): boolean {
            return [DELETE_NOTE, UPDATE_NOTE].includes(event.type) || super.eventApplies(event)
        }

        public handle(event: Event): void {
            switch (event.type) {
                case ADD_NOTE_TO_ENTITY:
                    this.handleAddNoteToEntity(event);
                    break;
                case DELETE_NOTE:
                    this.handleDeleteNote(event);
                    break;
                case UPDATE_NOTE:
                    this.handleUpdateNote(event);
                    break;
                default:
                    super.handle(event);
            }
        }
    }
}
