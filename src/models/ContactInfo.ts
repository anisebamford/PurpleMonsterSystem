type PhoneType = "HOME" | "CELL" | "FAX"
export type Phone = {
    type: PhoneType
    number: string
    preferred: boolean
    label?: string
}

export type Email = {
    address: string,
    preferred: boolean,
    label?: string
}

export type ContactInfo = {
    email: Email[],
    phone: Phone[],
}