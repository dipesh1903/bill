import { QuantityType, RangeType } from "../constant"

export interface InvoiceSettings {
    id: string,
    displayName: string,
    customerNames: string[],
    address: string[],
    products: Products[],
    rangeType: RangeType
    rangeValue: RangeSet
    productPerInvoiceRange: RangeSet,
}

export interface Products {
    description: string,
    hsnCode: number,
    qtyType: QuantityType,
    rate: number,
    id: string
}

export interface RangeSet {
    max: number,
    min: number
}

export interface companySettings extends companyInfo {
    names: string[],
    address: string[],
}

export interface companyInfo {
    state: string,
    stateCode: number,
    cgst: number,
    sgst: number,
    displayName: string,
    id: string
}