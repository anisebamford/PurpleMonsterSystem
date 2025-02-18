import {Entity} from "./Entity";
import {ContactInfo} from "./ContactInfo";

export interface Person extends Entity {
    firstName: string,
    lastName: string,
    birthday?: string,
    contactInfo: ContactInfo
}
