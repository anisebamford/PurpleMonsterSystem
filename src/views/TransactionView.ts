import {Annotated} from "./mixins/Annotated";
import {EntityView} from "./EntityView";
import {Transaction} from "../models/Transaction";
import {
    CreateTransaction, DeleteTransaction,
    Event,
    ProcessTransaction,
    RefundTransaction,
    SetTransactionAmount,
    SetTransactionCode,
    SetTransactionPaymentInfo,
    VoidTransaction
} from "../generated/events";
import {SET_TRANSACTION_CODE} from "../events/Transaction/SetTransactionCode";
import {PROCESS_TRANSACTION} from "../events/Transaction/ProcessTransaction";
import {SET_TRANSACTION_AMOUNT} from "../events/Transaction/SetTransactionAmount";
import {VOID_TRANSACTION} from "../events/Transaction/VoidTransaction";
import {SET_TRANSACTION_PAYMENT_INFO} from "../events/Transaction/SetTransactionPaymentInfo";
import {DELETE_TRANSACTION} from "../events/Transaction/DeleteTransaction";

export class TransactionView extends Annotated(EntityView<Transaction>) {
    constructor(event: CreateTransaction | RefundTransaction) {
        super(event.message);
    }

    handleSetTransactionCode(event: SetTransactionCode) {
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

    handleVoidTransaction(event: VoidTransaction) {
        if(!this.model.isProcessed) return;
        this.model.isVoid = true;
    }

    handleSetTransactionPaymentInfo(event: SetTransactionPaymentInfo) {
        if(this.model.isProcessed) return;
        this.model.paymentInfo = event.message.paymentInfo;
    }

    handleDeleteTransaction(event: DeleteTransaction) {
        if(this.model.isProcessed) return;
        this.model.isDeleted = true;
    }

    handle(event: Event) {
        if (!this.eventApplies(event)) return;
        switch (event.type) {
            case SET_TRANSACTION_CODE:
                this.handleSetTransactionCode(event)
                break;
            case PROCESS_TRANSACTION:
                this.handleProcessTransaction(event)
                break;
            case SET_TRANSACTION_AMOUNT:
                this.handleSetTransactionAmount(event)
                break;
            case VOID_TRANSACTION:
                this.handleVoidTransaction(event);
                break;
            case SET_TRANSACTION_PAYMENT_INFO:
                this.handleSetTransactionPaymentInfo(event);
                break;
            case DELETE_TRANSACTION:
                this.handleDeleteTransaction(event);
                break;
            default:
                super.handle(event);
        }
    }
}