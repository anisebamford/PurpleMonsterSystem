import {expect, it} from "bun:test"
import {View} from "./View";
import {Event} from "../generated/events"

it("Will handle events", () => {
    class TestClass extends View<any> {
        exposeEventApplies(event: Event) {
            return this.eventApplies(event)
        }
    }

    const view = new TestClass({})

    expect(view.exposeEventApplies({} as unknown as Event)).toBeFalse()
})