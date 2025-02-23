import {Annotated} from "./mixins/Annotated";
import {EntityView} from "./EntityView";
import {Transaction} from "../models/Transaction";
import {
    ChangeTransactionAmount,
    ChangeTransactionCode,
    CreateTransaction,
    Event,
    ProcessTransaction,
    RefundTransaction,
    SetTransactionAmount,
    SetTransactionCode,
    SetTransactionPaymentInfo,
    VoidTransaction
} from "../generated/events";
import {SET_TRANSACTION_CODE} from "../events/Transaction/SetTransactionCode";
import {CHANGE_TRANSACTION_CODE} from "../events/Transaction/ChangeTransactionCode";
import {PROCESS_TRANSACTION} from "../events/Transaction/ProcessTransaction";
import {SET_TRANSACTION_AMOUNT} from "../events/Transaction/SetTransactionAmount";
import {CHANGE_TRANSACTION_AMOUNT} from "../events/Transaction/ChangeTransactionAmount";
import {VOID_TRANSACTION} from "../events/Transaction/VoidTransaction";
import {SET_TRANSACTION_PAYMENT_INFO} from "../events/Transaction/SetTransactionPaymentInfo";

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

    handleChangeTransactionAmount(event: ChangeTransactionAmount) {
        if(this.model.isProcessed) return;
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
            case CHANGE_TRANSACTION_AMOUNT:
                this.handleChangeTransactionAmount(event)
                break;
            case VOID_TRANSACTION:
                this.handleVoidTransaction(event);
                break;
            case SET_TRANSACTION_PAYMENT_INFO:
                this.handleSetTransactionPaymentInfo(event);
                break;
            default:
                super.handle(event);
        }
    }
}