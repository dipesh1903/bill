import { QuantityType } from "../../constant"

export type companySettingsForm = {
    companyName: string,
    state: string,
    district: string,
    city: string
}

export type productCardValues = {
    productName: string,
    hsnCode: number,
    rate: number,
    qty: QuantityType
}