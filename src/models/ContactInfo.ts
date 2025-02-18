type PhoneType = "HOME" | "CELL" | "FAX"
export type Phone = {
    type: PhoneType
    label?: string
}

export type Email = {
    address: string,
    label?: string
}

export type ContactInfo = {
    email: Email[],
    phone: Phone[],
}