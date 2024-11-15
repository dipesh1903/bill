import { useForm } from "react-hook-form";
import { PrimaryButton } from "../../components/ui/button";
import { DatePicker } from "../../components/ui/date-picker";
import InputError from "../../components/ui/input-error";
import { InputLabel } from "../../components/ui/input-label";
import { NumberInput } from "../../components/ui/input-number";
import { TextInput } from "../../components/ui/input-string";
import { generateInvoices } from "../../utils/generateInvoice";
import { invoiceSetting } from "../../constant";
import TemplateBasic from "../../components/billTemplates/template-basic";
import { BillFE } from "../../types/bill";
import { renderToString } from "react-dom/server";
import jsPDF from "jspdf";
import JSZip from "jszip";
import { useLocation, useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import { stepperContextFnType } from "../../types/types";
import { companySettingsForm } from "../settings/types";
import { Products } from "../../types/settings";
import { toast } from "react-toastify";

export type fieldType = {
    gstNo: string,
    serialNo: number,
    billPerDay: number,
    startDate: Date,
    endDate: Date,
}

export default function InvoiceHome({value, stepperContextFns, companySetting, products, onAction}: {value?: fieldType,
    stepperContextFns?: stepperContextFnType,
    companySetting: companySettingsForm,
    products: Products[], onAction: () => void}) {
    const stepperContextFn = useOutletContext<[stepperContextFnType]>();
    const {state} = useLocation();
    const formValue = state && state.value ? state.value : value;
    const { register, getValues, formState: { isValid }, watch } = useForm<fieldType>({
        defaultValues: {
            gstNo: formValue?.gstNo || '',
            serialNo: formValue?.serialNo || undefined,
            billPerDay: formValue?.billPerDay || undefined,
            startDate: formValue?.startDate || undefined,
            endDate: formValue?.endDate || undefined
        }
    });
    const watchAll = watch();
    useEffect(() => {
        if (stepperContextFn && stepperContextFn[0] && typeof stepperContextFn[0] === 'function') {
            stepperContextFn[0](isValid, watchAll)
        } else if (stepperContextFns && typeof stepperContextFns === 'function') {
            stepperContextFns(isValid, watchAll)
        }
    }, [isValid, stepperContextFn, stepperContextFns, watchAll]);

    async function generateZip(values: BillFE[]) {
        const zipContent: Array<{
            name: string,
            content: Blob
        }> = [];
        for await (const bill of values) {
            const content = renderToString(<TemplateBasic companyInfo={companySetting} billDetails={bill.bill} bill={bill} cgst={companySetting.cgst} sgst={companySetting.sgst} />) 
            const doc = new jsPDF({
                unit: 'px',
                format: 'a4',
                hotfixes: ["px_scaling"]
            });
            await doc.html(content, {
            x: 20,
            y: 20,
            })
            let index = 0
            const cc = doc.output('blob');
            zipContent.push({
                name: `bill-${index++}.pdf`,
                content: cc
            }) 
        };
        const zip = new JSZip();
        let count = 0;
        const totalFiles = zipContent.length;
        function addFileToZip(index: number) {
            const file = zipContent[index];
            const filename = file.name;
            const content = file.content;

            zip.file(filename, content, {
                binary: true
            });
            count++;
            if (count === totalFiles) {
                zip.generateAsync({
                    type: "blob"
                }).then(function (content) {
                    const link = document.createElement("a");
                    link.href = URL.createObjectURL(content);
                    link.download = `cash-Bill${Math.floor(Math.random() * 100)}.zip`;
                    link.click();
                    URL.revokeObjectURL(link.href);
                });
            }
        }
        for (let i = 0; i < totalFiles; i++) {
            addFileToZip(i);
        }
        toast.success('Bills downloaded successfully')
        onAction();

    }

    function generateInvoice() {
        const {
            serialNo,
            startDate,
            endDate,
            billPerDay,
            gstNo
        } = getValues();

        generateZip(generateInvoices(
            serialNo,
            startDate,
            endDate,
            {
                max: billPerDay,
                min:billPerDay
            },
            companySetting,
            {
                ...invoiceSetting,
                products: products
            },
            gstNo,
        ))
    }
        
    return (
        <div className="flex-col">
            <div className="flex-col">
                    <InputLabel htmlFor="gstNo">GST No.</InputLabel>
                    <TextInput id="gstNo" 
                     placeholder="ABGXXXXX"
                     {
                        ...register('gstNo', {
                            required: true,
                            minLength: 10
                        })
                     }
                     />
                    <InputError />
            </div>
            <div className="flex flex-row gap-4">
                <div className="flex flex-col flex-1">
                    <InputLabel htmlFor="serialNo" >Serial No.</InputLabel>
                    <NumberInput id="serialNo" placeholder="1234"
                    {
                        ...register('serialNo')
                    }/>
                    <InputError />
                </div>
                <div className="flex flex-col flex-1">
                    <InputLabel>Bill per day</InputLabel>
                    <NumberInput placeholder="2"
                    {
                        ...register('billPerDay')
                    } />
                    <InputError />
                </div>
            </div>
            <div className="flex flex-row gap-4">
                <div className="flex flex-col flex-1">
                    <InputLabel>Start Date</InputLabel>
                    <DatePicker
                    onClick={(e) => e.currentTarget.showPicker()}
                    {
                        ...register('startDate')
                    } />
                    <InputError />
                </div>
                <div className="flex flex-col flex-1">
                    <InputLabel>End Date</InputLabel>
                    <DatePicker         
                    onClick={(e) => e.currentTarget.showPicker() }           
                    {
                        ...register('endDate')
                    }/>
                    <InputError />
                </div>
            </div>
            <PrimaryButton onClick={generateInvoice}>Generate</PrimaryButton>
        </div>
    )
}