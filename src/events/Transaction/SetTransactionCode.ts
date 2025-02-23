import {Transaction} from "../../models/Transaction";

// @event-type
export const SET_TRANSACTION_CODE = "SET_TRANSACTION_CODE";

// @event-message
export type SetTransactionCodeMessage = Pick<Transaction, "code">
