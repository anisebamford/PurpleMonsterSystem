import {Annotated} from "./mixins/Annotated";
import {EntityView} from "./EntityView";
import {Transaction} from "../models/Transaction";
import {ChangeTransactionCode, CreateTransaction, Event, SetTransactionCode} from "../generated/events";
import {SET_TRANSACTION_CODE} from "../events/Transaction/SetTransactionCode";
import {CHANGE_TRANSACTION_CODE} from "../events/Transaction/ChangeTransactionCode";

export class TransactionView extends Annotated(EntityView<Transaction>) {
    constructor(event: CreateTransaction) {
        super(event.message);
    }

    handleSetTransactionCode(event: SetTransactionCode) {
        this.model.code = event.message.code;
    }

    handleChangeTransactionCode(event: ChangeTransactionCode) {
        this.model.code = event.message.code;
    }

    handle(event: Event) {
        if (!this.eventApplies(event)) return;
        switch (event.type) {
            case SET_TRANSACTION_CODE:
                this.handleSetTransactionCode(event)
                break;
            case CHANGE_TRANSACTION_CODE:
                this.handleChangeTransactionCode(event)
                break;
        }
    }

}