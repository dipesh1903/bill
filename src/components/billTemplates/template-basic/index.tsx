import { STATE_CODE } from "../../../constant";
import { BillDetails, BillFE } from "../../../types/bill";
import { companyInfo } from "../../../types/settings";
import BillTable from "./bill-table";

type props = {
    billDetails: BillDetails[],
    companyInfo: companyInfo,
    cgst: number,
    sgst: number,
    bill: BillFE
}

export default function TemplateBasic(props: props) {
    const {companyInfo, bill} = props;
    return(
        <div className="flex flex-col w-[750px]">
            <div className="flex-1">GSTIN<span className="pl-2">{bill.gstNo}</span></div>
            <div style={{display: 'flex' , flexDirection: 'column', alignItems: 'center', padding: '20px'}}>
                <h1>{companyInfo.companyName}</h1>
                {/* <div><span className="pr-2">STOCKIST</span>:<span className="pl-2">G.C. SHEET</span></div> */}
                <div><span className="pr-2">{companyInfo.district}</span>::<span className="pl-2">{companyInfo.city}</span></div>
            </div>
            <div className="flex justify-between">
                <div>Serial No.<span className="pl-2">{bill.serialNo}</span></div>
                <div>Date: <span className="pr-2">{bill.date.toDateString()}</span></div>
            </div>
            <div className="flex flex-col">
                <div>Name:<span className="pl-2">{bill.name}</span></div>
                <div className=" pb-2">Address<span className="pl-2">{bill.address}</span></div>
                <div className="flex flex-row">
                <div className="flex flex-col gap-2">
                    <div>State:<span className="pl-2">{companyInfo.state.toLowerCase()}</span></div>
                    <div>State Code:<span className="pl-2">{STATE_CODE[companyInfo.state]}</span></div>
                </div>
            </div>
            </div>
            <BillTable {...props} />
        </div>
    )
}