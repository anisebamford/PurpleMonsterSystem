import {Annotated} from "./mixins/Annotated";
import {EntityView} from "./EntityView";
import {Transaction} from "../models/Transaction";
import {Event, CreateTransaction} from "../generated/events";

export class TransactionView extends Annotated(EntityView<Transaction>) {
    constructor(event: CreateTransaction) {
        super(event.message);
    }

    handle(event: Event) {
        if (!this.eventApplies(event)) return;
        switch (event.type) {

        }
    }

}