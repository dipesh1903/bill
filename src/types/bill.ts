import { QuantityType } from "../constant";
import { companyInfo, Products } from "./settings";

export interface BillFE extends Omit<companyInfo, 'displayName' | 'id'>{
    serialNo: number,
    date: Date,
    name: string,
    address?: string,
    gstNo?: string,
    bill: BillDetails[],
}

export interface BillDetails extends Omit<Products, 'cgst' | 'sgst'> {
    qty: number,
    qtyType: QuantityType,
    description: string,
    hsnCode: number,
    rate: number,
}