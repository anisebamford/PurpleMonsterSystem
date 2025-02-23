import {AnnotatedEntity} from "./Entity";

// @todo figure out what this should actually look like for credit cards
// @todo I figure the check id should look like 0000XXXXX-0000XXXXXXXX-0000.
//  The x's should be a hash of the routing, account and check number. the
//  first four should be the first 4 of the routing number, the middle four
//  should be the first 4 of the account number, and the last block should be
//  the entire check number.
export type PaymentInfo = {type: "CASH"} | {type: "CHECK", checkId: string}

export interface Transaction extends AnnotatedEntity {
    code: string,
    amount: number,
    isVoid: boolean,
    paymentInfo: PaymentInfo,
    isProcessed: boolean,
}
