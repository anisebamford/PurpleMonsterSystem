import {Entity} from "./Entity";
import {Transaction} from "./Transaction";

export interface Ledger extends Entity {
    transactions: Transaction["id"][]
    balance: number
}
