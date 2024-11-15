import { InvoiceSettings } from "./types/settings"

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

// export const companyDetails: companyInfo = {
//     state: "West Bengal",
//     stateCode: 19,
//     cgst: 9,
//     sgst: 9,
//     displayName: "Shree Ganesh Hardware",
//     id: "1234"
// }

export const invoiceSetting: InvoiceSettings = {
    id: "",
    customerNames: ['Cash'],
    address: [''],
    products: [{
        productName: "AC Sheet kh fegjer jhgjdrjhjrgegjh jewh ehg eluhgek jhrg,k",
        hsnCode: 12345,
        qty: QuantityType.KG,
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

export const STATE_CODE = {
    "JAMMU AND KASHMIR": "01",
    "HIMACHAL PRADESH": "02",
    "PUNJAB": "03",
    "CHANDIGARH": "04",
    "UTTARAKHAND": "05",
    "HARYANA": "06",
    "DELHI": "07",
    "RAJASTHAN": "08",
    "UTTAR PRADESH": "09",
    "BIHAR": "10",
    "SIKKIM": "11",
    "ARUNACHAL PRADESH": "12",
    "NAGALAND": "13",
    "MANIPUR": "14",
    "MIZORAM": "15",
    "TRIPURA": "16",
    "MEGHALAYA": "17",
    "ASSAM": "18",
    "WEST BENGAL": "19",
    "JHARKHAND": "20",
    "ODISHA": "21",
    "CHATTISGARH": "22",
    "MADHYA PRADESH": "23",
    "GUJARAT": "24",
    "DADRA AND NAGAR HAVELI AND DAMAN AND DIU (NEWLY MERGED UT)": "26*",
    "MAHARASHTRA": "27",
    "ANDHRA PRADESH(BEFORE DIVISION)": "28",
    "KARNATAKA": "29",
    "GOA": "30",
    "LAKSHADWEEP": "31",
    "KERALA": "32",
    "TAMIL NADU": "33",
    "PUDUCHERRY": "34",
    "ANDAMAN AND NICOBAR ISLANDS": "35",
    "TELANGANA": "36",
    "ANDHRA PRADESH (NEWLY ADDED)": "37",
    "LADAKH (NEWLY ADDED)": "38",
    "OTHER TERRITORY": "97",
    "CENTRE JURISDICTION": "99"
}


