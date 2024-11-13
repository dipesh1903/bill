import { useForm } from "react-hook-form";
import { PrimaryButton } from "../../components/ui/button";
import { DatePicker } from "../../components/ui/date-picker";
import InputError from "../../components/ui/input-error";
import { InputLabel } from "../../components/ui/input-label";
import { NumberInput } from "../../components/ui/input-number";
import { TextInput } from "../../components/ui/input-string";
import { generateInvoices } from "../../utils/generateInvoice";
import { companyDetails, invoiceSetting } from "../../constant";
import TemplateBasic from "../../components/billTemplates/template-basic";
import { BillFE } from "../../types/bill";
import { renderToString } from "react-dom/server";
import jsPDF from "jspdf";
import JSZip from "jszip";

type fieldType = {
    gstNo: string,
    serialNo: number,
    billPerDay: number,
    startDate: Date,
    endDate: Date
}

export default function InvoiceHome() {
    const { register, getValues } = useForm<fieldType>();
    async function generateZip(values: BillFE[]) {
        const zipContent: Array<{
            name: string,
            content: Blob
        }> = [];
        for await (const bill of values) {
            const content = renderToString(<TemplateBasic billDetails={bill.bill} cgst={9} sgst={9} />) 
            const doc = new jsPDF({
                unit: 'px',
                format: 'a4',
                hotfixes: ["px_scaling"]
            });
            await doc.html(content, {
            x: 20,
            y: 20,
            })
            const cc = doc.output('blob');
            zipContent.push({
                name: `${Math.random()}-file.pdf`,
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
                    // Create a download link
                    const link = document.createElement("a");
                    link.href = URL.createObjectURL(content);
                    link.download = "my-files.zip";
                    link.click();
                    URL.revokeObjectURL(link.href);
                });
            }
        }
        for (let i = 0; i < totalFiles; i++) {
            addFileToZip(i);
        }

    }

    function generateInvoice() {
        const {
            serialNo,
            startDate,
            endDate,
            billPerDay
        } = getValues();

        generateZip(generateInvoices(
            serialNo,
            startDate,
            endDate,
            {
                max: billPerDay,
                min:billPerDay
            },
            companyDetails,
            invoiceSetting
        ))
    }
        
    return (
        <div className="flex-col">
            <div className="flex-col">
                    <InputLabel htmlFor="gstNo">GST No.</InputLabel>
                    <TextInput id="gstNo" 
                     placeholder="ABGXXXXX"
                     {
                        ...register('gstNo')
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
                    <NumberInput placeholder="23"
                    {
                        ...register('billPerDay')
                    } />
                    <InputError />
                </div>
            </div>
            <div className="flex flex-row gap-4">
                <div className="flex flex-col flex-1">
                    <InputLabel>Start Date</InputLabel>
                    <DatePicker                    {
                        ...register('startDate')
                    } />
                    <InputError />
                </div>
                <div className="flex flex-col flex-1">
                    <InputLabel>End Date</InputLabel>
                    <DatePicker                    {
                        ...register('endDate')
                    }/>
                    <InputError />
                </div>
            </div>
            <PrimaryButton onClick={generateInvoice}>Generate</PrimaryButton>
        </div>
    )
}