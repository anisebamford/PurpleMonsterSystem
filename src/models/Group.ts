import {AnnotatedEntity} from "./Entity";

export interface Group extends AnnotatedEntity {
  id: string;
  name: string;
  contactId: string[];
}