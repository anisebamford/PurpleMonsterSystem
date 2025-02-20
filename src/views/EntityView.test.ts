import {expect, it } from "bun:test";
import {EntityView} from "./EntityView";
import {Event} from "../generated/events";
import {CLEAN_ROOM} from "../events/Room/CleanRoom";

class TestClass extends EntityView<any> {
    public exposeEventApplies<T extends Event>(event: T) {
        return this.eventApplies(event)
    }
}

it("will check if an event entityId matches the model's id", async () => {

    const entityView = new TestClass({
        id: "foo",
    })

    expect(entityView.exposeEventApplies({
        type: CLEAN_ROOM,
        entityId: "bar",
        id: "",
        message: null,
        timestamp: "",
        userId: ""
    })).toBeFalsy()

    expect(entityView.exposeEventApplies({
        type: CLEAN_ROOM,
        entityId: "foo",
        id: "",
        message: null,
        timestamp: "",
        userId: ""
    })).toBeTruthy()
})