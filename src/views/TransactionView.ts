import {Annotated} from "./mixins/Annotated";
import {EntityView} from "./EntityView";
import {Transaction} from "../models/Transaction";
import {
    ChangeTransactionCode,
    CreateTransaction,
    Event,
    ProcessTransaction, RefundTransaction,
    SetTransactionCode
} from "../generated/events";
import {SET_TRANSACTION_CODE} from "../events/Transaction/SetTransactionCode";
import {CHANGE_TRANSACTION_CODE} from "../events/Transaction/ChangeTransactionCode";
import {PROCESS_TRANSACTION} from "../events/Transaction/ProcessTransaction";

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
            default:
                super.handle(event);
        }
    }

}