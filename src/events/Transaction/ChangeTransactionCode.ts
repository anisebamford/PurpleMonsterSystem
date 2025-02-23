import {Transaction} from "../../models/Transaction";

// @event-type
export const CHANGE_TRANSACTION_CODE = "CHANGE_TRANSACTION_CODE";

// @event-message
export type ChangeTransactionCodeMessage = Pick<Transaction, "code">