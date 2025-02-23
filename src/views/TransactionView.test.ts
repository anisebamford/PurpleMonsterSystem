import {expect, it} from "bun:test"
import {Transaction} from "../models/Transaction";
import {TransactionView} from "./TransactionView";
import {SET_TRANSACTION_CODE} from "../events/Transaction/SetTransactionCode";
import {CHANGE_TRANSACTION_CODE} from "../events/Transaction/ChangeTransactionCode";
import {PROCESS_TRANSACTION} from "../events/Transaction/ProcessTransaction";
import {REFUND_TRANSACTION} from "../events/Transaction/RefundTransaction";

function testTransaction(transaction?: Partial<Transaction>) {
    return Object.assign({
        id: "foo",
        code: "bar",
        amount: 0,
        isVoid: false,
        paymentInfo: "CASH",
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

it("Will change a transaction code", async () => {
    const view = await createView();

    view.handle({
        type: CHANGE_TRANSACTION_CODE,
        entityId: "foo",
        id: "",
        message: {
            code: "this code"
        },
        timestamp: "",
        userId: ""
    })
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

it("won't change codes on processed transactions", async () => {
    const view = await createView({
        isProcessed: true,
        code: "this code",
    });

    console.log(view.model)

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

    view.handle({
        type: CHANGE_TRANSACTION_CODE,
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