import {Transaction} from "../../models/Transaction";

// @event-type
export const REFUND_TRANSACTION = "REFUND_TRANSACTION";

// @event-message
export type RefundTransactionMessage = Transaction;