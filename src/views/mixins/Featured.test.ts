import {it, expect} from "bun:test";
import {Featured} from "./Featured";
import {EntityView} from "../EntityView";
import {Event} from "../../generated/events";
import {FeaturedEntity} from "../../models/Entity";
import {ADD_FEATURE_TO_ENTITY} from "../../events/Feature/AddFeatureToEntity";
import {Feature} from "../../models/Feature";
import {REMOVE_FEATURE_FROM_ENTITY} from "../../events/Feature/RemoveFeatureFromEntity";
import {UPDATE_FEATURE} from "../../events/Feature/UpdateFeature";
import {DELETE_FEATURE} from "../../events/Feature/DeleteFeature";

class TestClass extends Featured(EntityView<FeaturedEntity>) {
    exposeEventApplies(event: Event) {
        return this.eventApplies(event)
    }
}

function createView(entity?: Partial<FeaturedEntity>) {
    return new TestClass(
        Object.assign({
            id: "foo",
            features: []
        }, entity)
    );
}

const testFeature: Feature = {
    id: "all-bed",
    description: "EVEN THE SHOWER!!!!",
    name: "THE WHOLE ROOM IS A BED!"
}

it("Will add a feature to an entity", async () => {
    const view = createView();

    view.handle({
        type: ADD_FEATURE_TO_ENTITY,
        entityId: "",
        id: "",
        message: testFeature,
        timestamp: "",
        userId: ""
    })

    expect(view.model.features[0].id).toEqual("all-bed");
})

it("Will remove a feature from an entity", async () => {
    const view = createView({features: [
        testFeature,
    ]});

    view.handle({
        type: REMOVE_FEATURE_FROM_ENTITY,
        entityId: "foo",
        id: "",
        message: {id: "all-bed"},
        timestamp: "",
        userId: ""
    })

    expect(view.model.features.length).toEqual(0);
})

it("Will update a feature", async () => {
    const view = createView({features: [testFeature]});

    view.handle({
        type: UPDATE_FEATURE,
        entityId: "",
        id: "",
        message: {
            id: "all-bed",
            description: "EVEN THE SHOWER!!!! AND THE MICROWAAAAAAVE!!!!",
            name: "new name"
        },
        timestamp: "",
        userId: ""
    })

    expect(view.model.features[0].name).toEqual("new name");
})

it("Will delete a feature", async () => {
    const view = createView({features: [testFeature]});
    view.handle({
        type: DELETE_FEATURE,
        entityId: "all-bed",
        id: "",
        message: null,
        timestamp: "",
        userId: ""
    })
})

it("Will accept UPDATE_FEATURE", async () => {
    const view = createView();

    expect(view.exposeEventApplies({
        type: UPDATE_FEATURE,
        entityId: "",
        id: "",
        message: testFeature,
        timestamp: "",
        userId: ""
    })).toBeTruthy()
})

it("Will accept DELETE_FEATURE", async () => {
    const view = createView();

    expect(view.exposeEventApplies({
        type: DELETE_FEATURE,
        entityId: "",
        id: "",
        message: null,
        timestamp: "",
        userId: ""
    }))
})