import { useContextStore } from "../../../store/storageContext";
import { BillFE } from "../../../types/bill"
import { getAmountAndPaisa } from "../../../utils/utility";
import { InputLabel } from "../../ui/input-label";
import { TextInput } from "../../ui/input-string";
type props = {
    billDetails: BillFE,
    cgst: number,
    sgst: number,
    isPreview?: boolean
    setQtyRange: (val: string) => void
}

export default function BillTable({billDetails, cgst, sgst, isPreview, setQtyRange}: props) {
    const storage = useContextStore();
    let qtyRange = '';
    if (storage?.settings?.qtyRange) {
        const {
            max, min
        } = storage.settings.qtyRange
        qtyRange = [min, max].join(',');
    }

    let totalRef = billDetails.bill.reduce((acc, bill) => acc + (Math.round(+bill.quantity * +bill.rate) * 100 / 100), 0)
    
    const sgstAmt = Math.round((+sgst / 100)*totalRef * 100) / 100;
    const cgstAmt = Math.round((+cgst / 100)*totalRef * 100) / 100;
    
    totalRef += cgstAmt + sgstAmt;
    
    const [cgstRupees, cgstPaisa] = getAmountAndPaisa(cgstAmt);
    const [sgstRupees, sgstPaisa] = getAmountAndPaisa(sgstAmt)
    
    const converted = +getAmountAndPaisa(totalRef)[1];
    const roundoff = converted > Number(50) ? `${100 - converted}` : `- ${converted}`;
    return (
        <>
        <table className="border-2 border-black text-sm mt-5">
        <tr className="text-[10px]">
            <th className="border-black  border-2 border-l-0 px-6 py-2">QTY</th>
            <th className="border-black  border-2  border-l-0 px-10 py-2 flex-1">DESCRIPTION ITEMS</th>
            <th className="border-black  border-2 border-l-0 px-3 py-2">HSN CODE</th>
            <th className="border-black  border-2 border-l-0 px-1 py-2">RATE</th>
            <th colSpan={2} className="border-black  border-2 border-l-0 border-r-0 px-6 py-2">AMOUNT (RS)</th>
        </tr>
        {
            billDetails.bill.map((bill, index) => { 
                const [rupees, paisa] = getAmountAndPaisa(+bill.rate * +bill.quantity);
                return (
                <tr key={index} className="">
                    <td className="border-black whitespace-nowrap  border-r-2 px-6 py-2"> 
                        {
                            isPreview ?
                            <div className="flex flex-col">
                                <InputLabel>Qty Range</InputLabel>
                                <TextInput placeholder="(50,70)"
                                defaultValue={qtyRange}
                                onChange={(e) => setQtyRange(e.target.value)}/>
                            </div> 
                             : <span>{bill.quantity}</span>
                        }
                        <span className="pl-1">{bill.qty}</span></td>
                    <td className="border-black  border-r-2 px-6 py-2 flex-1">{bill.productName}</td>
                    <td className="border-black whitespace-nowrap  border-r-2 px-3 py-2">{bill.hsnCode}</td>
                    <td className="border-black whitespace-nowrap  border-r-2 px-1 py-2">{bill.rate}</td>
                    <td className="border-black whitespace-nowrap  border-r-2  px-6 py-2">{rupees}</td>
                    <td className="border-black whitespace-nowrap  border-r-0 px-6 py-2">{paisa}</td>
                </tr>
            )})
        }
        <tr className="">
            <td className="border-black whitespace-nowrap  border-r-2 px-6 py-2"></td>
            <td className="border-black   border-r-2 px-6 py-8 text-right flex-1">
                <div className="flex flex-col gap-2">
                    <div><span>CGST @ </span><span>{cgst} %</span></div>
                </div>
            </td>
            <td className="border-black whitespace-nowrap  border-r-2 px-1 py-2"></td>
            <td className="border-black whitespace-nowrap  border-r-2 px-1 py-2"></td>
            <td className="border-black whitespace-nowrap   border-r-2 px-6 py-2">{cgstRupees}</td>
            <td className="border-black whitespace-nowrap   border-r-0 px-6 py-2">{cgstPaisa}</td>
        </tr>
        <tr className="">
            <td className="border-black whitespace-nowrap  border-r-2 px-6 py-2"></td>
            <td className="border-black   border-r-2 px-6 py-8 text-right flex-1">
                <div className="flex flex-col gap-2">
                    <div><span>CGST @ </span><span>{sgst} %</span></div>
                </div>
            </td>
            <td className="border-black whitespace-nowrap  border-r-2 px-1 py-2"></td>
            <td className="border-black whitespace-nowrap  border-r-2 px-1 py-2"></td>
            <td className="border-black whitespace-nowrap   border-r-2 px-6 py-2">{sgstRupees}</td>
            <td className="border-black whitespace-nowrap   border-r-0 px-6 py-2">{sgstPaisa}</td>
        </tr>
        <tr className="">
            <td className="border-black whitespace-nowrap  border-r-2 px-6 py-2"></td>
            <td className="border-black   border-r-2 px-3  text-right flex-1"></td>
            <td className="border-black whitespace-nowrap  border-r-2 px-1 py-2"></td>
            <td className="border-black whitespace-nowrap border-t-2  border-r-2 px-1 py-2">Round/off</td>
            <td className="border-black whitespace-nowrap border-t-2 border-r-2 px-6 py-2">{roundoff}</td>
            <td className="border-black whitespace-nowrap border-t-2   border-r-0 px-2 py-2"></td>
        </tr>
        <tr className="">
            <td className="border-black whitespace-nowrap  border-r-2 px-6 py-2"></td>
            <td className="border-black   border-r-2 px-1 text-right flex-1"></td>
            <td className="border-black whitespace-nowrap  border-r-2 px-1 py-2"></td>
            <td className="border-black whitespace-nowrap border-t-2  border-r-2 px-6 py-2">total</td>
            <td className="border-black whitespace-nowrap border-t-2 border-r-2 px-6 py-2">{Math.round(totalRef)}</td>
            <td className="border-black whitespace-nowrap border-t-2   border-r-0 px-2 py-2">00</td>
        </tr>
    </table>
    </>
    )
}