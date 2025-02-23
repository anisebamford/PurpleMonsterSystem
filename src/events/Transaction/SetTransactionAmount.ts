import {Transaction} from "../../models/Transaction";

// @event-type
export const SET_TRANSACTION_AMOUNT = "SET_TRANSACTION_AMOUNT";

// @event-message
export type SetTransactionAmountMessage = Pick<Transaction, "amount">
