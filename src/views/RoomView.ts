import {Room} from "../models/Room";
import {BLOCK_ROOM} from "../events/Room/BlockRoom";
import {CLEAN_ROOM} from "../events/Room/CleanRoom";
import {DESCRIBE_ROOM} from "../events/Room/DescribeRoom";
import {DIRTY_ROOM} from "../events/Room/DirtyRoom";
import {DELETE_ROOM} from "../events/Room/DeleteRoom";
import {RELEASE_ROOM} from "../events/Room/ReleaseRoom";
import {RENAME_ROOM} from "../events/Room/RenameRoom";
import {
    BlockRoom,
    ChangeTypeOfRoom,
    CleanRoom,
    CreateRoom,
    DeleteRoom,
    DescribeRoom,
    DirtyRoom,
    Event,
    ReleaseRoom,
    RenameRoom,
    UpdateRoomType
} from "../generated/events";
import {Annotated} from "./mixins/Annotated";
import {Featured} from "./mixins/Featured";
import {EntityView} from "./EntityView";
import {UPDATE_ROOM_TYPE} from "../events/RoomType/UpdateRoomType";
import {CHANGE_TYPE_OF_ROOM} from "../events/Room/ChangeTypeOfRoom";

export class RoomView extends Featured(Annotated(EntityView<Room>)) {
    constructor (event: CreateRoom) {
        super(event.message);
    }

    protected eventApplies<T extends Event>(event: T): boolean {
        return [UPDATE_ROOM_TYPE].includes(event.type) || super.eventApplies(event);
    }

    protected blockRoomHandler(event: BlockRoom) {
        if (event.message) {
            this.innerModel.notes.push(event.message);
        }
        this.innerModel.isBlocked = true;
    }

    protected cleanRoomHandler(event: CleanRoom) {
        this.innerModel.isClean = true;
    }

    protected deleteRoomHandler(event: DeleteRoom) {
        this.innerModel.isDeleted = true;
    }

    protected describeRoomHandler(event: DescribeRoom) {
        this.innerModel.description = event.message.description
    }

    protected dirtyRoomHandler(event: DirtyRoom) {
        this.innerModel.isClean = false;
    }

    protected releaseRoomHandler(event: ReleaseRoom) {
        this.innerModel.isBlocked = false;
    }

    protected renameRoomHandler(event: RenameRoom) {
        this.innerModel.name = event.message.name;
    }

    protected updateRoomTypeHandler(event: UpdateRoomType) {
        if (this.innerModel.roomType.id === event.entityId) {
            this.innerModel.roomType = event.message
        }
    }

    protected changeTypeOfRoomHandler(event: ChangeTypeOfRoom) {
        this.innerModel.roomType = event.message;
    }

    handle(event: Event): void {
        if (!this.eventApplies(event)) return;
        switch (event.type) {
            case BLOCK_ROOM:
                this.blockRoomHandler(event);
                break;
            case CLEAN_ROOM:
                this.cleanRoomHandler(event);
                break;
            case DELETE_ROOM:
                this.deleteRoomHandler(event);
                break;
            case DESCRIBE_ROOM:
                this.describeRoomHandler(event);
                break;
            case DIRTY_ROOM:
                this.dirtyRoomHandler(event);
                break;
            case RELEASE_ROOM:
                this.releaseRoomHandler(event);
                break;
            case RENAME_ROOM:
                this.renameRoomHandler(event);
                break;
            case UPDATE_ROOM_TYPE:
                this.updateRoomTypeHandler(event);
                break;
            case CHANGE_TYPE_OF_ROOM:
                this.changeTypeOfRoomHandler(event);
                break;
            default:
                super.handle(event);
        }
    }
}
