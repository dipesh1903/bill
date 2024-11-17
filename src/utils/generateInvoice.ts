import moment from "moment";
import { BillFE } from "../types/bill";
import { BillSettings, companyInfo, InvoiceSettings, RangeSet } from "../types/settings";
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
    billSettings: BillSettings
): BillFE[] {

    let serialTrack = serialNo;
    let dateTrack = moment(startDate);
    let dateCount = moment(endDate).diff(moment(startDate), 'days') + 1;
    const result: BillFE[] = [];
    const customerNames = billSettings?.customerNames || invoiceSettings.customerNames;
    const address = billSettings?.address || [companyInfo.district];
    const qtyRange = billSettings?.qtyRange || invoiceSettings.rangeValue;
    while(dateCount > 0) {
        let index = getRandomInteger(billPerDay);
        while (index > 0) {
            const bill = generateBill({...invoiceSettings, rangeValue: qtyRange});
            result.push({
                serialNo: serialTrack,
                date: dateTrack.toDate(),
                name: customerNames[getRandomInteger({min: 0, max: customerNames.length - 1})],
                bill,
                gstNo,
                address: address[getRandomInteger({min: 0, max: address.length - 1})],
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