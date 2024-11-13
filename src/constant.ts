import { companyInfo, InvoiceSettings } from "./types/settings"

export const USER_NAMES = [
    'Anil',
    'Arjun',
    'Sitam',
    'Ankit',
    'Bhoopesh',
    'Md Shakib'
]

export enum RangeType {
    QUANTITY = 'QUANTITY',
}

export enum QuantityType {
    KG = 'KG',
    PCS = 'PCS',
    METER = 'METER'
}

export const companyDetails: companyInfo = {
    state: "West Bengal",
    stateCode: 19,
    cgst: 9,
    sgst: 9,
    displayName: "Shree Ganesh Hardware",
    id: "1234"
}

export const invoiceSetting: InvoiceSettings = {
    id: "",
    displayName: "Company Name",
    customerNames: ['Cash'],
    address: [''],
    products: [{
        description: "AC Sheet kh fegjer jhgjdrjhjrgegjh jewh ehg eluhgek jhrg,k",
        hsnCode: 12345,
        qtyType: QuantityType.KG,
        rate: 80,
        cgst: 9,
        sgst: 9
    }],
    rangeType: RangeType.QUANTITY,
    rangeValue: {
        max: 70,
        min: 50
    },
    productPerInvoiceRange: {
        max: 1,
        min: 1
    },
}
