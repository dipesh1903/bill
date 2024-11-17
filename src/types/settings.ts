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

export type companySettings = companyInfo;

export interface companyInfo {
    state: string,
    cgst: number,
    sgst: number,
    companyName: string,
    city: string,
    district: string
    id?: string
}

export interface BillSettings {
    customerNames?: string[],
    address?: string[],
    qtyRange?: RangeSet
}