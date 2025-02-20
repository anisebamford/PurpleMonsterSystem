import {Featured} from "./mixins/Featured";
import {EntityView} from "./EntityView";
import {RoomType} from "../models/RoomType";
import {Event, CreateRoomType, UpdateRoomType} from "../generated/events";
import {UPDATE_ROOM_TYPE} from "../events/RoomType/UpdateRoomType";

export class RoomTypeView extends Featured(EntityView<RoomType>){
    constructor(event: CreateRoomType) {
        super(event.message);
    }

    handleUpdateRoomType(event: UpdateRoomType) {
        this.innerModel = event.message;
    }

    handle(event: Event) {
        if (!this.eventApplies(event)) return;
        switch (event.type) {
            case UPDATE_ROOM_TYPE:
                this.handleUpdateRoomType(event);
                break;
            default:
                super.handle(event);
        }
    }
}