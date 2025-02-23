import {it, expect} from "bun:test";
import {LedgerView} from "./LedgerView";
import {Ledger} from "../models/Ledger";

function testLedger(ledger?: Partial<Ledger>): Ledger {
    return Object.assign({
        balance: 0,
        id: "foo",
        transactions: []
    }, ledger);
}

function createView(ledger?: Partial<Ledger>) {
    return new LedgerView({
        entityId: "",
        id: "",
        message: testLedger(ledger),
        timestamp: "",
        type: "CREATE_LEDGER",
        userId: ""
    })
}

it("will construct", () => {
    expect(createView()).toBeInstanceOf(LedgerView);
})
