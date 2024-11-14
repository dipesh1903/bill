import { useState } from "react";
import { DropdownContent, DropdownItem, DropdownRoot, DropdownTrigger } from "../../components/ui/dropdown";
import InputError from "../../components/ui/input-error";
import { InputLabel } from "../../components/ui/input-label";
import { TextInput } from "../../components/ui/input-string";
import { STATES } from "../../constant";
import { cn } from "../../utils/reactUtils";

export default function CompanySettings() {
    const [open , setOpen] = useState(false);
    const [value, setValue] = useState('');
    return (
        <div>
            <div>
                <InputLabel>Company Name</InputLabel>
                <TextInput />
                <InputError/>
            </div>
            <InputLabel>State</InputLabel>
            <div className="relative my-2 ring-2 ring-outline-high">
                <div className={cn("w-72  h-12 p-2 border-2 rounded-lg border-black", {'ring-2 ring-outline-low': open})} onClick={() => setOpen(true)}>{value}</div>
                <DropdownRoot open={open} onOpenChange={setOpen}>
                    <DropdownTrigger asChild>
                        <div className="w-72 p-2 h-12 border-2 rounded-lg border-black absolute top-0 invisible">Open dropdown okay</div>
                    </DropdownTrigger>
                    <DropdownContent className="p-2 hover:cursor-pointer max-h-72 max-w-72 bg-surface-low rounded-lg shadow-lg overflow-scroll" >
                        {
                            STATES.map((state, index) => (
                                <DropdownItem key={index}
                                onClick={() => setValue(state)}
                                className="px-3 outline-none py-1 mb-[2px] rounded-md hover:bg-solid-high hover:text-white">{state}</DropdownItem>
                            ))
                        }
                    </DropdownContent>
                </DropdownRoot>
            </div>
            <div>
                <InputLabel>District</InputLabel>
                <TextInput />
                <InputError/>
            </div>
            <div>
                <InputLabel>City</InputLabel>
                <TextInput />
                <InputError/>
            </div>
        </div>
    )
}