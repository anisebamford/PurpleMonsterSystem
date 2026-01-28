import {AnnotatedEntity} from "./Entity";
import {Person} from "./Person";
import {ContactInfo} from "./ContactInfo";
import {Address} from "./Address";

export interface User extends AnnotatedEntity, Person {
  isActive: Boolean;
  username: string
  password: string;
  contactInfo: ContactInfo;
  address: Address;
  // @todo
  // permissions: Permission[];
}