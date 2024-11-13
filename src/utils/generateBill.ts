
// Read below to generate the pdfs :
// https://react.dev/reference/react-dom/server/renderToString
// https://www.npmjs.com/package/react-helmet

import { QuantityType, RangeType } from "../constant";
import { BillDetails } from "../types/bill";
import { InvoiceSettings } from "../types/settings";
import { getRandomInteger, getRandomDecimal } from "./utility";

export function generateBill(settings: InvoiceSettings): BillDetails[]  {
    const {
        productPerInvoiceRange,
        rangeType,
        rangeValue,
        products
    } = settings

    const result: BillDetails[] = [];

    let productCount = productPerInvoiceRange ? getRandomInteger(productPerInvoiceRange) : 1
    let qty = rangeValue.min
    if (rangeType === RangeType.QUANTITY) {

        while (productCount > 0) {
            const product = products[getRandomInteger({min: 0, max: products.length - 1})];
            let newQty = getRandomInteger(rangeValue) 
            while(newQty === qty ) {
                newQty = product.qtyType === QuantityType.PCS ? getRandomInteger(rangeValue) : getRandomDecimal(rangeValue, 1)
            }
            qty = newQty
            result.push({
                qty,
                qtyType: product.qtyType,
                description: product.description,
                hsnCode: product.hsnCode,
                rate: product.rate
            })
            productCount--;
        }
    }   
    return result;
}