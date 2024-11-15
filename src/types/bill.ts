import { productCardValues } from "../pages/settings/types";
import { companyInfo } from "./settings";

export interface BillFE extends Omit<companyInfo, 'displayName' | 'id'>{
    serialNo: number,
    date: Date,
    name: string,
    address?: string,
    gstNo?: string,
    bill: BillDetails[],
}

export interface BillDetails extends productCardValues {
    quantity: number,
    id?: string
}