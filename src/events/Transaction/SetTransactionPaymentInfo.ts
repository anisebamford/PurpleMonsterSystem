import {PaymentInfo, Transaction} from "../../models/Transaction";

// @event-type
export const SET_TRANSACTION_PAYMENT_INFO = "SET_TRANSACTION_PAYMENT_INFO";

// @event-message
export type SetTransactionPaymentInfoMessage = Pick<Transaction, "paymentInfo">