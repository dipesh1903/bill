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
        id: '12324'
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

export const STATES = [
    "JAMMU AND KASHMIR",
    "HIMACHAL PRADESH",
    "PUNJAB",
    "CHANDIGARH",
    "UTTARAKHAND",
    "HARYANA",
    "DELHI",
    "RAJASTHAN",
    "UTTAR PRADESH",
    "BIHAR",
    "SIKKIM",
    "ARUNACHAL PRADESH",
    "NAGALAND",
    "MANIPUR",
    "MIZORAM",
    "TRIPURA",
    "MEGHALAYA",
    "ASSAM",
    "WEST BENGAL",
    "JHARKHAND",
    "ODISHA",
    "CHATTISGARH",
    "MADHYA PRADESH",
    "GUJARAT",
    "DADRA AND NAGAR HAVELI AND DAMAN AND DIU (NEWLY MERGED UT)",
    "MAHARASHTRA",
    "ANDHRA PRADESH(BEFORE DIVISION)",
    "KARNATAKA",
    "GOA",
    "LAKSHADWEEP",
    "KERALA",
    "TAMIL NADU",
    "PUDUCHERRY",
    "ANDAMAN AND NICOBAR ISLANDS",
    "TELANGANA",
    "ANDHRA PRADESH (NEWLY ADDED)",
    "LADAKH (NEWLY ADDED)",
    "OTHER TERRITORY",
    "CENTRE JURISDICTION"
]

export const STATE_CODE = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "26*",
    "27",
    "28",
    "29",
    "30",
    "31",
    "32",
    "33",
    "34",
    "35",
    "36",
    "37",
    "38",
    "97",
    "99"
]
