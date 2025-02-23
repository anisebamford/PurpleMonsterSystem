import {expect, it} from "bun:test"
import {Transaction} from "../models/Transaction";
import {TransactionView} from "./TransactionView";
import {SET_TRANSACTION_CODE} from "../events/Transaction/SetTransactionCode";

function testTransaction(transaction?: Partial<Transaction>) {
    return Object.assign({
        id: "foo",
        code: "bar",
        amount: 0,
        isVoid: false,
        paymentInfo: "CASH",
        notes: []
    }, transaction);
}

function createView(transaction?: Partial<Transaction>) {
    return new TransactionView({
        id: "",
        entityId: "foo",
        message: testTransaction(),
        timestamp: "",
        type: "CREATE_TRANSACTION",
        userId: ""
    });
}

it("Will construct", async () => {
    expect(createView()).toBeInstanceOf(TransactionView);
})

it("Will set a transaction code", async () => {
    const view = await createView();

    view.handle({
        type: SET_TRANSACTION_CODE,
        entityId: "foo",
        id: "",
        message: {
            code: "this code"
        },
        timestamp: "",
        userId: ""
    })

    expect(view.model.code).toEqual("this code");
})

