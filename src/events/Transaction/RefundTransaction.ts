import {Transaction} from "../../models/Transaction";

// @todo should this also void the txn at entity-id?

// @event-type
export const REFUND_TRANSACTION = "REFUND_TRANSACTION";

// @event-message
export type RefundTransactionMessage = Transaction;