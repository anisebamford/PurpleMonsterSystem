import {Transaction} from "../../models/Transaction";

// @event-type
export const CHANGE_TRANSACTION_AMOUNT = "CHANGE_TRANSACTION_AMOUNT";

// @event-message
export type ChangeTransactionAmountMessage = Pick<Transaction, "amount">