import {AnnotatedEntity} from "./Entity";
import {Person} from "./Person";
import {Address} from "./Address";

export interface Guest extends Person, AnnotatedEntity {
    address?: Address,
    isBlacklisted: boolean,
}
