import {EntityView} from "../views/EntityView";
import {Entity} from "../models/Entity";
import {View} from "../views/View";
import {Event} from "../generated/events";
import {CREATE_GUEST} from "../events/Guest/CreateGuest";
import {GuestView} from "../views/GuestView";
import {CREATE_FEATURE} from "../events/Feature/CreateFeature";
import {FeatureView} from "../views/FeatureView";
import {CREATE_ROOM} from "../events/Room/CreateRoom";
import {RoomView} from "../views/RoomView";
import {CREATE_TRANSACTION} from "../events/Transaction/CreateTransaction";
import {TransactionView} from "../views/TransactionView";
import {CREATE_LEDGER} from "../events/Ledger/CreateLedger";
import {LedgerView} from "../views/LedgerView";
import {CREATE_ROOM_TYPE} from "../events/RoomType/CreateRoomType";
import {RoomTypeView} from "../views/RoomTypeView";
import {REFUND_TRANSACTION} from "../events/Transaction/RefundTransaction";

export class EntityViewManager extends View<Record<string, EntityView<Entity>>>{
    constructor() {
        super({})
    }

    // @todo this isn't super type safe. Make it better.
    getEntityById<T extends Entity>(id: string): T | null {
        return this.model[id].model as T || null;
    }

    handle(event: Event): void {
        switch (event.type) {
            case CREATE_GUEST:
                this.model[event.entityId] = new GuestView(event)
                break;
            case CREATE_FEATURE:
                this.model[event.entityId] = new FeatureView(event)
                break;
            case CREATE_ROOM:
                this.model[event.entityId] = new RoomView(event)
                break;
            case CREATE_TRANSACTION:
                this.model[event.entityId] = new TransactionView(event)
                break;
            case CREATE_LEDGER:
                this.model[event.entityId] = new LedgerView(event)
                break;
            case CREATE_ROOM_TYPE:
                this.model[event.entityId] = new RoomTypeView(event)
                break;
            case REFUND_TRANSACTION:
                this.model[event.entityId] = new TransactionView(event)
                break;
        }
        for (const view of Object.values(this.model)) {
            view.handle(event);
        }
    }
}
