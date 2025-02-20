import {expect, it} from "bun:test";
import {RoomTypeView} from "./RoomTypeView";
import {RoomType} from "../models/RoomType";

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

