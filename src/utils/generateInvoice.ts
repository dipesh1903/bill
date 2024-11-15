import moment from "moment";
import { BillFE } from "../types/bill";
import { companyInfo, InvoiceSettings, RangeSet } from "../types/settings";
import { getRandomInteger } from "./utility";
import { generateBill } from "./generateBill";

export function generateInvoices(
    serialNo: number,
    startDate: Date,
    endDate: Date,
    billPerDay: RangeSet,
    companyInfo: companyInfo,
    invoiceSettings: InvoiceSettings,
    gstNo: string,
    address?: string,
): BillFE[] {

    let serialTrack = serialNo;
    let dateTrack = moment(startDate);
    let dateCount = moment(endDate).diff(moment(startDate), 'days') + 1;
    const result: BillFE[] = [];

    while(dateCount > 0) {
        let index = getRandomInteger(billPerDay);
        while (index > 0) {
            const bill = generateBill(invoiceSettings);
            result.push({
                serialNo: serialTrack,
                date: dateTrack.toDate(),
                name: invoiceSettings.customerNames[getRandomInteger({min: 0, max: invoiceSettings.customerNames.length - 1})],
                bill,
                gstNo,
                address,
                ...companyInfo
            })
            dateTrack = moment(dateTrack).add(1, 'day');
            serialTrack++;
            index--;
        }
        dateCount--
    }
    return result;
}