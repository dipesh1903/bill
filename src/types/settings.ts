import { RangeType } from "../constant"
import { productCardValues } from "../pages/settings/types"

export interface InvoiceSettings {
    id?: string,
    customerNames: string[],
    address: string[],
    products: Products[],
    rangeType: RangeType
    rangeValue: RangeSet
    productPerInvoiceRange: RangeSet,
}

export interface Products extends productCardValues {
    id?: string
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
    cgst: number,
    sgst: number,
    companyName: string,
    city: string,
    district: string
    id?: string
}