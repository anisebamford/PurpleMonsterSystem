import {Annotated} from "./mixins/Annotated";
import {EntityView} from "./EntityView";
import {Guest} from "../models/Guest";
import {BlacklistGuest, CreateGuest, DeleteGuest, Event, UnbanGuest} from "../generated/events";
import {BLACKLIST_GUEST} from "../events/Guest/BlacklistGuest";
import {UNBAN_GUEST} from "../events/Guest/UnbanGuest";
import {DELETE_GUEST} from "../events/Guest/DeleteGuest";

export class GuestView extends Annotated(EntityView<Guest>) {
    constructor(event: CreateGuest) {
        super(event.message);
    }

    handleBlacklistGuest(event: BlacklistGuest) {
        this.model.isBlacklisted = true;
        this.model.notes.push(event.message);
    }

    handleUnbanGuest(event: UnbanGuest) {
        this.model.isBlacklisted = false;
        this.model.notes.push(event.message);
    }

    handleDeleteGuest(event: DeleteGuest) {
        this.model.isDeleted = true;
    }

    handle(event: Event) {
        if (!this.eventApplies(event)) return;
        switch (event.type) {
            case BLACKLIST_GUEST:
                this.handleBlacklistGuest(event);
                break;
            case UNBAN_GUEST:
                this.handleUnbanGuest(event);
                break;
            case DELETE_GUEST:
                this.handleDeleteGuest(event);
                break;
            default:
                super.handle(event);
        }
    }
}