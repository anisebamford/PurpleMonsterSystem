import {it, expect} from "bun:test"
import {Event} from "../generated/events";
import {Guest} from "../models/Guest";
import {GuestView} from "./GuestView";
import {CREATE_GUEST} from "../events/Guest/CreateGuest";
import {BLACKLIST_GUEST} from "../events/Guest/BlacklistGuest";
import {UNBAN_GUEST} from "../events/Guest/UnbanGuest";
import {DELETE_GUEST} from "../events/Guest/DeleteGuest";

function testGuest() : Guest {
    return {
        contactInfo: {
            email: [],
            phone: [],
        },
        firstName: "iam",
        isBlacklisted: false,
        lastName: "sam",
        notes: [],
        id: "sam"
    }
}

function createView(guest: Partial<Guest>) {
    return new GuestView({
        type: CREATE_GUEST,
        entityId: "sam",
        id: "",
        timestamp: "",
        userId: "",
        message: Object.assign(testGuest(), guest)
    })
}

it("will blacklist a guest", async () => {
    const guest = createView({isBlacklisted: true})
    guest.handle({
        type: BLACKLIST_GUEST,
        entityId: "sam",
        id: "",
        message: {
            id: "",
            contents: "Won't leave staff alone about green eggs and ham",
            userId: "",
            timestamp: ""
        },
        timestamp: "",
        userId: ""
    })

    expect(guest.model.isBlacklisted).toBeTruthy()
    expect(guest.model.notes.length).toBe(1)
})

it("Will unban a guest", async () => {
    const guest = createView({isBlacklisted: true})

    guest.handle({
        type: UNBAN_GUEST,
        entityId: "sam",
        id: "",
        message: {
            userId: "",
            timestamp: "",
            contents: "Say, I do like green eggs and ham",
            id: "",
        },
        timestamp: "",
        userId: "",
    })

    expect(guest.model.isBlacklisted).toBeFalsy()
    expect(guest.model.notes.length).toBe(1)
})

it("Will delete a guest", async () => {
    const guest = createView({isDeleted: false})

    guest.handle({
        type: DELETE_GUEST,
        entityId: "sam",
        id: "",
        message: null,
        timestamp: "",
        userId: ""
    })
    expect(guest.model.isDeleted).toBeTruthy()
})