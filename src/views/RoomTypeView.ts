import {Featured} from "./mixins/Featured";
import {EntityView} from "./EntityView";
import {RoomType} from "../models/RoomType";
import {CreateRoomType} from "../generated/events";

export class RoomTypeView extends Featured(EntityView<RoomType>){
    constructor(event: CreateRoomType) {
        super(event.message);
    }
}