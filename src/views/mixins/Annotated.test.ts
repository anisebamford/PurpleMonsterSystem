import {it, expect} from "bun:test";
import {Annotated} from "./Annotated";
import {EntityView} from "../EntityView";
import {AnnotatedEntity} from "../../models/Entity";
import {ADD_NOTE_TO_ENTITY} from "../../events/Note/AddNoteToEntity";
import {UPDATE_NOTE} from "../../events/Note/UpdateNote";
import {DELETE_NOTE} from "../../events/Note/DeleteNote";
import {Event} from "../../generated/events";

class TestClass extends Annotated(EntityView<AnnotatedEntity>) {
    exposeEventApplies(event: Event) {
        return this.eventApplies(event)
    }
}

function createView(entity?: Partial<AnnotatedEntity>): TestClass {
    return new TestClass(Object.assign({
        id: "foo",
        notes: [],
    }, entity));
}

it("Will construct", async () => {
    expect(createView()).toBeInstanceOf(TestClass);
})

it("Will add a new note", async () => {
    const view = createView();

    view.handle({
        type: ADD_NOTE_TO_ENTITY,
        entityId: "foo",
        id: "",
        message: {
            id: "",
            timestamp: "",
            userId: "",
            contents: "Hello!"
        },
        timestamp: "",
        userId: ""
    })

    expect(view.model.notes[0].contents).toBe("Hello!");
})

it("Will delete a note", async () => {
    const view = createView({notes: [
        {
            id: "bar",
            timestamp: "",
            userId: "",
            contents: "Hello!"
        }
    ]});

    view.handle({
        type: DELETE_NOTE,
        entityId: "bar",
        id: "",
        message: {
            id: "bar",
        },
        timestamp: "",
        userId: ""
    })

    expect(view.model.notes.length).toBe(0)
})

it("Will update a note", async () => {
    const view = createView({notes: [
            {
                id: "bar",
                timestamp: "",
                userId: "",
                contents: "Hello!"
            }
        ]});

    view.handle({
        type: UPDATE_NOTE,
        entityId: "bar",
        id: "",
        message: {
            id: "bar",
            timestamp: "",
            userId: "",
            contents: "Good Bye!"
        },
        timestamp: "",
        userId: ""
    })

    expect(view.model.notes[0].contents).toBe("Good Bye!");
})

it("Will attempt to apply DELETE_NOTE", async () => {
    const view = createView({notes: []})

    expect(view.exposeEventApplies({
        type: DELETE_NOTE,
        entityId: "",
        id: "",
        message: {id: ""},
        timestamp: "",
        userId: ""
    })).toBeTruthy()
})

it ("Will attempt to apply UPDATE_NOTE", async () => {
    const view = createView({notes: []})


    expect(view.exposeEventApplies({
        type: UPDATE_NOTE,
        entityId: "",
        id: "",
        message: {
            id: "",
            timestamp: "",
            userId: "",
            contents: ""
        },
        timestamp: "",
        userId: ""
    })).toBeTruthy()
})