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
    CleanRoom,
    CreateRoom,
    DeleteRoom,
    DescribeRoom,
    DirtyRoom,
    Event,
    ReleaseRoom,
    RenameRoom
} from "../generated/events";
import {Annotated} from "./mixins/Annotated";
import {Featured} from "./mixins/Featured";
import {EntityView} from "./EntityView";

export class RoomView extends Featured(Annotated(EntityView<Room>)) {
    constructor (event: CreateRoom) {
        super(event.message);
    }

    protected blockRoomHandler(evt: BlockRoom) {
        if (evt.message) {
            this.innerModel.notes.push(evt.message);
        }
        this.innerModel.isBlocked = true;
    }

    protected cleanRoomHandler(evt: CleanRoom) {
        this.innerModel.isClean = true;
    }

    protected deleteRoomHandler(evt: DeleteRoom) {
        this.innerModel.isDeleted = true;
    }

    protected describeRoomHandler(evt: DescribeRoom) {
        this.innerModel.description = evt.message.description
    }

    protected dirtyRoomHandler(evt: DirtyRoom) {
        this.innerModel.isClean = false;
    }

    protected releaseRoomHandler(evt: ReleaseRoom) {
        this.innerModel.isBlocked = false;
    }

    protected renameRoomHandler(evt: RenameRoom) {
        this.innerModel.name = evt.message.name;
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
            default:
                super.handle(event);
        }
    }
}
