import {AnnotatedEntity} from "./Entity";

export type PaymentInfo = "CASH"

export interface Transaction extends AnnotatedEntity {
    code: string,
    amount: number,
    isVoid: boolean,
    paymentInfo: PaymentInfo,
    isProcessed: boolean,
}