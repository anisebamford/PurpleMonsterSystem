import {EntityView} from "./EntityView";
import {Ledger} from "../models/Ledger";
import {CreateLedger} from "../generated/events";

export class LedgerView extends EntityView<Ledger> {
    constructor(event: CreateLedger) {
        super(event.message);
    }

}