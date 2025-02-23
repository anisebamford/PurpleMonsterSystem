import {Annotated} from "./mixins/Annotated";
import {EntityView} from "./EntityView";
import {Transaction} from "../models/Transaction";
import {
    ChangeTransactionCode,
    CreateTransaction,
    Event,
    ProcessTransaction, RefundTransaction, SetTransactionAmount,
    SetTransactionCode
} from "../generated/events";
import {SET_TRANSACTION_CODE} from "../events/Transaction/SetTransactionCode";
import {CHANGE_TRANSACTION_CODE} from "../events/Transaction/ChangeTransactionCode";
import {PROCESS_TRANSACTION} from "../events/Transaction/ProcessTransaction";
import {SET_TRANSACTION_AMOUNT} from "../events/Transaction/SetTransactionAmount";

export class TransactionView extends Annotated(EntityView<Transaction>) {
    constructor(event: CreateTransaction | RefundTransaction) {
        super(event.message);
    }

    handleSetTransactionCode(event: SetTransactionCode) {
        if (this.model.isProcessed) return;
        this.model.code = event.message.code;
    }

    handleChangeTransactionCode(event: ChangeTransactionCode) {
        if (this.model.isProcessed) return;
        this.model.code = event.message.code;
    }

    handleProcessTransaction(event: ProcessTransaction) {
        this.model.isProcessed = true;
    }

    handleSetTransactionAmount(event: SetTransactionAmount) {
        if (this.model.isProcessed) return;
        this.model.amount = event.message.amount;
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
            case PROCESS_TRANSACTION:
                this.handleProcessTransaction(event)
                break;
            case SET_TRANSACTION_AMOUNT:
                this.handleSetTransactionAmount(event)
                break;
            default:
                super.handle(event);
        }
    }

}