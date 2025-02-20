import {expect, it} from "bun:test";
import {FeatureView} from "./FeatureView";
import { Feature } from "../models/Feature";
import {CREATE_FEATURE} from "../events/Feature/CreateFeature";
import {DELETE_FEATURE} from "../events/Feature/DeleteFeature";

function testFeature(): Feature {
    return {
        description: "",
        name: "",
        id: "foo"
    }
}

function createView(feature?: Partial<Feature>) {
    return new FeatureView({
        entityId: "foo",
        id: "",
        timestamp: "",
        type: CREATE_FEATURE,
        userId: "",
        message: Object.assign(testFeature(), feature)
    });
}

it("Will construct", () => {
    expect(createView()).toBeInstanceOf(FeatureView);
})

it("Will handle DELETE_FEATURE", async () => {
    const view = createView();

    view.handle({
        type: DELETE_FEATURE,
        entityId: "foo",
        id: "",
        message: null,
        timestamp: "",
        userId: ""
    })

    expect(view.model.isDeleted).toBeTruthy()
})