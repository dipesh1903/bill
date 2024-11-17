import { useForm } from "react-hook-form";
import { STATE_CODE } from "../../../constant";
import { BillFE } from "../../../types/bill";
import { companyInfo } from "../../../types/settings";
import { cn } from "../../../utils/reactUtils";
import { PrimaryButton } from "../../ui/button";
import { TextInput } from "../../ui/input-string";
import BillTable from "./bill-table";
import { useContextDispatch, useContextStore } from "../../../store/storageContext";
import { toast } from "react-toastify";
import { useRef } from "react";

type props = {
    billDetails: BillFE,
    companyInfo: companyInfo,
    cgst: number,
    sgst: number,
    signature: string,
    onSave?: () => void,
    isPreview?: boolean
}

type fieldValues = {
    customerName: string,
    address: string
}

export default function TemplateBasic(props: props) {
    const {companyInfo, billDetails, isPreview, signature, onSave} = props;
    const storage = useContextStore();
    const {register, getValues} = useForm<fieldValues>({
        defaultValues: {
            customerName: storage?.settings?.customerNames?.join(',') || '',
            address: storage?.settings?.address?.join(',') || ''
        }
    });
    const qtyRangeRef = useRef('');
    const dispatch = useContextDispatch();
    function saveConfig() {
        let {
            customerName,
            address
        } = getValues();
        const qtyRange = qtyRangeRef.current.split(',')
        customerName = customerName.trim();
        address = address.trim();
        dispatch((prev) => ({
            ...prev,
            settings: {
                customerNames: customerName.length ?  customerName.split(',') : undefined,
                address: address.length ?  address.split(',') : undefined,
                qtyRange: qtyRange.length ? {min: +qtyRange[0], max: qtyRange[1] ? +qtyRange[1] : +qtyRange[0]} : undefined
            }
        }))
        if (onSave && typeof onSave === 'function') {
            onSave();
        }
        toast.success('Settings updated successfully')
    }

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
                <div className="flex flex-col gap-1 flex-1">
                    <div className="mr-12">
                    <span className="font-bold">Name:</span>
                        { 
                        isPreview ? 
                            <TextInput
                                {
                                    ...register('customerName')
                                }
                                placeholder="Add list of customer names (eg: acme , xyz, )"></TextInput> :
                            <span className="pl-2">{billDetails.name}</span>
                        }
                    </div>
                    <div className="mr-12">
                        <span className="font-bold">Address:</span>
                        {
                            isPreview ?
                            <TextInput
                                {
                                    ...register('address')
                                }
                                placeholder="Add list of address (eg: acme , xyz...)"></TextInput> :
                            <span className="pl-2">{billDetails.address ? billDetails.address : billDetails.district}</span>
                        }
                    </div>
                </div>
                <div className="flex flex-row">
                    <div className="flex flex-col gap-1">
                        <div><span className="font-bold">State:</span><span className="pl-2">{companyInfo.state.toLowerCase()}</span></div>
                        <div><span className="font-bold">State Code:</span><span className="pl-2">{STATE_CODE[companyInfo.state]}</span></div>
                    </div>
                </div>
            </div>
            <BillTable {...props}
                setQtyRange={(val) => qtyRangeRef.current = val.trim()}
            />
            <div className="pt-2">
                <div className="italic font-extralight">{signature}</div>
                <div>For {billDetails.companyName}</div>
            </div>
            { isPreview && 
                <div className="flex justify-end">
                    <PrimaryButton className="w-fit px-4" onClick={saveConfig}>Save</PrimaryButton>
                </div>
            }
        </div>
    )
}