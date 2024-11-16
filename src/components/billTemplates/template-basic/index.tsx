import { STATE_CODE } from "../../../constant";
import { BillFE } from "../../../types/bill";
import { companyInfo } from "../../../types/settings";
import { cn } from "../../../utils/reactUtils";
import BillTable from "./bill-table";

type props = {
    billDetails: BillFE,
    companyInfo: companyInfo,
    cgst: number,
    sgst: number,
    isPreview?: boolean
}

export default function TemplateBasic(props: props) {
    const {companyInfo, billDetails, isPreview} = props;
    return(
        <div className={cn("flex flex-col w-[750px]", {'w-full': isPreview})}>
            <div className="flex-1">GSTIN<span className="pl-2">{billDetails.gstNo}</span></div>
            <div style={{display: 'flex' , flexDirection: 'column', alignItems: 'center', padding: '10px'}}>
                <h1>{companyInfo.companyName}</h1>
                <div><span className="pr-2">{companyInfo.district}</span>::<span className="pl-2">{companyInfo.city}</span></div>
            </div>
            <div className="flex justify-between">
                <div className="pb-4"><span className="font-bold">Serial No.</span><span className="pl-2">{billDetails.serialNo}</span></div>
                <div><span className="font-bold pb-2">Date: </span><span className="pl-2">{billDetails.date.toDateString()}</span></div>
            </div>
            <div className="flex flex-row justify-between">
                <div className="flex flex-col gap-1">
                    <div><span className="font-bold">Name:</span><span className="pl-2">{billDetails.name}</span></div>
                    <div><span className="font-bold">Address:</span><span className="pl-2">{billDetails.district}</span></div>
                </div>
                <div className="flex flex-row">
                    <div className="flex flex-col gap-1">
                        <div><span className="font-bold">State:</span><span className="pl-2">{companyInfo.state.toLowerCase()}</span></div>
                        <div><span className="font-bold">State Code:</span><span className="pl-2">{STATE_CODE[companyInfo.state]}</span></div>
                    </div>
                </div>
            </div>
            <BillTable {...props} />
        </div>
    )
}