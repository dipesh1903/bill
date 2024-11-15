import { QuantityType } from "../../constant"

export type companySettingsForm = {
    companyName: string,
    state: string,
    district: string,
    city: string,
    cgst: number,
    sgst: number
}

export interface productCardValues {
    productName: string,
    hsnCode: number,
    rate: number,
    qty: QuantityType
}