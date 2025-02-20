import {expect, it} from "bun:test";
import {RoomTypeView} from "./RoomTypeView";
import {RoomType} from "../models/RoomType";
import {UPDATE_ROOM_TYPE} from "../events/RoomType/UpdateRoomType";
import {DELETE_ROOM_TYPE} from "../events/RoomType/DeleteRoomType";

function testRoomType(): RoomType {
    return {
        id: "sand",
        description: "We took out the carpets and replaced them with sand!",
        name: "Indoor Sandbox",
        features: [],
    }
}

function createView(roomType?: Partial<RoomType>): RoomTypeView {
    return new RoomTypeView({
        type: "CREATE_ROOM_TYPE",
        id: "",
        entityId: "sand",
        message: testRoomType(),
        userId: "",
        timestamp: ""
    })
}

it("Will construct", () => {
    expect(createView()).toBeInstanceOf(RoomTypeView);
})

it("Will update the room type", () => {
    const roomType = createView({name: "sand"})

    roomType.handle({
        type: UPDATE_ROOM_TYPE,
        entityId: "sand",
        id: "",
        message: {
            id: "sand",
            name: "No more sand",
            description: "We took out the sand because you all never believed in our vision.",
            features: [],
        },
        timestamp: "",
        userId: ""
    })

    expect(roomType.model.name).toBe("No more sand")
})

it("Will delete a room type", () => {
    const roomType = createView()

    roomType.handle({
        type: DELETE_ROOM_TYPE,
        entityId: "sand",
        id: "",
        message: null,
        timestamp: "",
        userId: ""
    })

    expect(roomType.model.isDeleted).toBeTrue();
})
