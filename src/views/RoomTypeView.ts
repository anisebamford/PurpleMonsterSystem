import {Featured} from "./mixins/Featured";
import {EntityView} from "./EntityView";
import {RoomType} from "../models/RoomType";
import {Event, CreateRoomType, UpdateRoomType, DeleteRoomType} from "../generated/events";
import {UPDATE_ROOM_TYPE} from "../events/RoomType/UpdateRoomType";
import {DELETE_ROOM_TYPE} from "../events/RoomType/DeleteRoomType";

export class RoomTypeView extends Featured(EntityView<RoomType>){
    constructor(event: CreateRoomType) {
        super(event.message);
    }

    handleUpdateRoomType(event: UpdateRoomType) {
        this.model = event.message;
    }

    handleDeleteRoomType(event: DeleteRoomType) {
        this.model.isDeleted = true;
    }

    handle(event: Event) {
        if (!this.eventApplies(event)) return;
        switch (event.type) {
            case UPDATE_ROOM_TYPE:
                this.handleUpdateRoomType(event);
                break;
            case DELETE_ROOM_TYPE:
                this.handleDeleteRoomType(event);
                break;
            default:
                super.handle(event);
        }
    }
}