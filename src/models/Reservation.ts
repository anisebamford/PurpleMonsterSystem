import {AnnotatedEntity} from "./Entity";

export type RESERVATION_STATUS =
  "WAIT_LIST" |
  "PENDING" |
  "CANCELLED" |
  "RESERVED" |
  "CHECKED_IN" |
  "CHECKED_OUT" |
  "HOLD";

export interface Reservation extends AnnotatedEntity {
  id: string;
  guestId: string;
  checkIn: string;
  checkOut: string;
  roomId?: string;
  source: string;
  rate: number[];
  ledgerId?: string;
  status: RESERVATION_STATUS;
}
