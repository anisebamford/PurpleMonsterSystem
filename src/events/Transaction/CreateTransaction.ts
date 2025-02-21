import {Transaction} from "../../models/Transaction";

// @event-type
export const CREATE_TRANSACTION = "CREATE_TRANSACTION";

// @event-message
export type CreateTransactionMessage = Transaction
