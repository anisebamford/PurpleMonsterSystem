import {Annotated} from "./mixins/Annotated";
import {EntityView} from "./EntityView";
import {Transaction} from "../models/Transaction";
import {CreateTransaction, Event, SetTransactionCode} from "../generated/events";
import {SET_TRANSACTION_CODE} from "../events/Transaction/SetTransactionCode";

export class TransactionView extends Annotated(EntityView<Transaction>) {
    constructor(event: CreateTransaction) {
        super(event.message);
    }

    handleSetTransactionCode(event: SetTransactionCode) {
        this.model.code = event.message.code;
    }

    handle(event: Event) {
        if (!this.eventApplies(event)) return;
        switch (event.type) {
            case SET_TRANSACTION_CODE:
                this.handleSetTransactionCode(event)
                break;

        }
    }

}