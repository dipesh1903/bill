import { BillDetails } from "../../../types/bill";
import BillTable from "./bill-table";

type props = {
    billDetails: BillDetails[],
    cgst: number,
    sgst: number
}

export default function TemplateBasic(props: props) {
    return(
        <div>
            <div className="flex flex-col items-center">
                <h1>Company Name</h1>
                <div><span>STOCKIST</span>:<span>G.C. SHEET</span></div>
                <div><span>address1</span>::<span>address2</span></div>
            </div>
            <div className="flex justify-between">
                <div>Serial NO.<span>23</span></div>
                <div>Date: <span>23/24/2014</span></div>
            </div>
            <div className="flex flex-col">
                <div>Name:<span>23</span></div>
                <div>Address<span>random</span></div>
                <div className="flex flex-row">
                    <div className="flex-1">GSTIN<span>gst no</span></div>
                    <div className="flex flex-row gap-2">
                        <div>State:<span>State</span></div>
                        <div>State Code<span>state _ code</span></div>
                    </div>
                </div>
            </div>
            <BillTable {...props} />
        </div>
    )
}