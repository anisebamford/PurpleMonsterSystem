import {expect, it} from "bun:test"
import {Transaction} from "../models/Transaction";
import {TransactionView} from "./TransactionView";
import {SET_TRANSACTION_CODE} from "../events/Transaction/SetTransactionCode";
import {PROCESS_TRANSACTION} from "../events/Transaction/ProcessTransaction";
import {REFUND_TRANSACTION} from "../events/Transaction/RefundTransaction";
import {SET_TRANSACTION_AMOUNT} from "../events/Transaction/SetTransactionAmount";
import {VOID_TRANSACTION} from "../events/Transaction/VoidTransaction";
import {SET_TRANSACTION_PAYMENT_INFO} from "../events/Transaction/SetTransactionPaymentInfo";
import {DELETE_TRANSACTION} from "../events/Transaction/DeleteTransaction";

function testTransaction(transaction?: Partial<Transaction>) {
    return Object.assign({
        id: "foo",
        code: "bar",
        amount: 0,
        isVoid: false,
        paymentInfo: {type: "CASH"},
        notes: [],
        isProcessed: false,
    }, transaction);
}

function createView(transaction?: Partial<Transaction>) {
    return new TransactionView({
        id: "",
        entityId: "foo",
        message: testTransaction(transaction),
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

it("Will process a transaction", async () => {
    const view = await createView();

    view.handle({
        type: PROCESS_TRANSACTION,
        entityId: "foo",
        id: "",
        message: null,
        timestamp: "",
        userId: ""
    })

    expect(view.model.isProcessed).toEqual(true);
})

it("won't set codes on processed transactions", async () => {
    const view = await createView({
        isProcessed: true,
        code: "this code",
    });

    view.handle({
        type: SET_TRANSACTION_CODE,
        entityId: "foo",
        id: "",
        message: {
            code: "not this code"
        },
        timestamp: "",
        userId: ""
    })

    expect(view.model.code).toEqual("this code");
});

it("will create a view from a refund transaction message", () => {
    expect(new TransactionView({
        entityId: "",
        id: "",
        message: testTransaction(),
        timestamp: "",
        type: REFUND_TRANSACTION,
        userId: ""
    })).toBeInstanceOf(TransactionView);
})

it("will set a transaction amount", () => {
    const view = createView()

    view.handle({
        type: SET_TRANSACTION_AMOUNT,
        id: "",
        entityId: "foo",
        message: {
            amount: 99.99
        },
        timestamp: "",
        userId: ""
    })

    expect(view.model.amount).toEqual(99.99);
})

it("Will void a transaction if it has been processed", () => {
    const view = createView({isProcessed: true});

    view.handle({
        entityId: "foo",
        id: "",
        message: null,
        timestamp: "",
        type: VOID_TRANSACTION,
        userId: ""
    })

    expect(view.model.isVoid).toEqual(true);
})

it("Will not void a transaction if it has not been processed", () => {
    const view = createView({isProcessed: false});
    view.handle({
        entityId: "foo",
        id: "",
        message: null,
        timestamp: "",
        type: VOID_TRANSACTION,
        userId: ""
    })

    expect(view.model.isVoid).toEqual(false);
})

it("Will set payment info", () => {
    const view = createView();

    view.handle({
        entityId: "foo",
        id: "",
        message: {
            paymentInfo: {
                type: "CHECK",
                checkId: ""
            }
        },
        timestamp: "",
        type: SET_TRANSACTION_PAYMENT_INFO,
        userId: ""
    })

    expect(view.model.paymentInfo.type).toEqual("CHECK");
})

it("Will not set payment info if transaction is processed", () => {
    const view = createView({isProcessed: true});

    view.handle({
        entityId: "foo",
        id: "",
        message: {
            paymentInfo: {
                type: "CHECK",
                checkId: ""
            }
        },
        timestamp: "",
        type: SET_TRANSACTION_PAYMENT_INFO,
        userId: ""
    })

    expect(view.model.paymentInfo.type).toEqual("CASH");
})

it("Will delete a transaction", () => {
    const view = createView();
    view.handle({
        type: DELETE_TRANSACTION,
        entityId: "foo",
        id: "",
        message: null,
        timestamp: "",
        userId: ""
    })

    expect(view.model.isDeleted).toEqual(true);
})

it("Will not delete a processed transaction", () => {
    const view = createView({isProcessed: true});
    view.handle({
        type: DELETE_TRANSACTION,
        entityId: "foo",
        id: "",
        message: null,
        timestamp: "",
        userId: ""
    })

    expect(view.model.isDeleted).toBeFalsy()
})