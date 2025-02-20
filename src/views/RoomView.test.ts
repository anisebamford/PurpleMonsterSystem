import {expect, it} from "bun:test"
import {RoomView} from "./RoomView";
import {Room} from "../models/Room";
import {CREATE_ROOM} from "../events/Room/CreateRoom";
import {RELEASE_ROOM} from "../events/Room/ReleaseRoom";
import {DIRTY_ROOM} from "../events/Room/DirtyRoom";
import {exampleNote} from "../models/Note";
import {CLEAN_ROOM} from "../events/Room/CleanRoom";
import {DELETE_ROOM} from "../events/Room/DeleteRoom";
import {DESCRIBE_ROOM} from "../events/Room/DescribeRoom";
import {UPDATE_ROOM_TYPE} from "../events/RoomType/UpdateRoomType";


export const exampleRoom: Room = {
    description: "",
    features: [],
    isBlocked: false,
    isClean: true,
    isDeleted: false,
    isOccupied: false,
    notes: [],
    roomType: {
        id: "all-beds",
        name: "all beds",
        description: "who needs furniture when you can sleep on the FLOOOOOR!",
        features: []
    },
    id: "00000000-0000-4000-9000-000000000000",
    name: "example room"
}

function createView(room: Partial<Room> = {}) {
    return new RoomView({
        entityId: "",
        id: "",
        timestamp: "",
        type: CREATE_ROOM,
        userId: "",
        message: Object.assign(exampleRoom, room)
    })
}

it("will create a new room view", async () => {
    const roomView = createView()
    expect(roomView.model).toBeTruthy()
})

it("will block a room", async () => {
    const roomView = createView({isBlocked: false})

    roomView.handle({
        type: "BLOCK_ROOM",
        entityId: exampleRoom.id,
        id: "",
        message: exampleNote,
        timestamp: "",
        userId: ""
    })

    expect(roomView.model.isBlocked).toBeTruthy()
    expect(roomView.model.notes[0].id).toBe(exampleNote.id)
})

it("will release a room", async () => {
    const roomView = createView({isBlocked: true})

    roomView.handle({
        type: RELEASE_ROOM,
        entityId: exampleRoom.id,
        id: "",
        message: exampleNote,
        timestamp: "",
        userId: ""
    })

    expect(roomView.model.isBlocked).toBeFalsy()
    expect(roomView.model.notes[0].id).toBe(exampleNote.id)
})

it("will dirty a room", async () => {
    const roomView = createView({isClean: true});

    roomView.handle({
        entityId: exampleRoom.id,
        id: "",
        message: exampleNote,
        timestamp: "",
        userId: "",
        type: DIRTY_ROOM
    })

    expect(roomView.model.isClean).toBeFalsy();
})

it("will clean a room", async () => {
    const roomView = createView({isClean: false})

    roomView.handle({
        entityId: exampleRoom.id,
        id: "",
        message: null,
        timestamp: "",
        userId: "",
        type: CLEAN_ROOM
    })

    expect(roomView.model.isClean).toBeTruthy()
})

it("will delete a room", async () => {
    const roomView = createView({isDeleted: false})

    roomView.handle({
        type: DELETE_ROOM,
        entityId: exampleRoom.id,
        id: "",
        message: undefined,
        timestamp: "",
        userId: ""
    })

    expect(roomView.model.isDeleted).toBeTruthy()
})

it("will describe a room", async () => {
    const roomView = createView({description: "bar"})

    roomView.handle({
        type: DESCRIBE_ROOM,
        entityId: exampleRoom.id,
        id: "",
        message: {
            description: "foo",
        },
        timestamp: "",
        userId: ""
    })

    expect(roomView.model.description).toBe("foo")
})

it("will rename a room", async () => {
    const roomView = createView({name: "bar"})

    roomView.handle({
        type: "RENAME_ROOM",
        entityId: exampleRoom.id,
        id: "",
        message: {
            name: "foo",
        },
        timestamp: "",
        userId: ""
    })

    expect(roomView.model.name).toBe("foo")
})

it("Will update a room type", () => {
    const roomView = createView();

    roomView.handle({
        type: UPDATE_ROOM_TYPE,
        entityId: "all-beds",
        id: "",
        message: {
            id: "all-beds",
            name: "100% Mattress coverage",
            description: "Even the ceiling is bed!",
            features: []
        },
        timestamp: "",
        userId: ""
    })

    expect(roomView.model.roomType.name).toBe("100% Mattress coverage")
})