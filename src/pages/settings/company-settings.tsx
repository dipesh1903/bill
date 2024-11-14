import { useEffect, useState } from "react";
import { DropdownContent, DropdownItem, DropdownRoot, DropdownTrigger } from "../../components/ui/dropdown";
import InputError from "../../components/ui/input-error";
import { InputLabel } from "../../components/ui/input-label";
import { TextInput } from "../../components/ui/input-string";
import { STATES } from "../../constant";
import { cn } from "../../utils/reactUtils";
import { companySettingsForm } from "./types";
import { useLocation, useOutletContext } from "react-router-dom";
import { stepperContextFnType } from "../../types/types";
import { useForm } from "react-hook-form";


export default function CompanySettings({value}: {value?: companySettingsForm}) {
    
    const [open , setOpen] = useState(false);
    const {state} = useLocation();
    const formValue = state && state.value ? state.value : value;
    const { register, setValue, watch, formState: {isValid} } = useForm<companySettingsForm>({
        defaultValues: {
            companyName: formValue.companyName || '',
            state: formValue.state || '',
            district: formValue.district || '',
            city: formValue.city || ''
        }
    })
    const [stepperContextFn] = useOutletContext<[stepperContextFnType]>();
    const watchAll = watch();

    useEffect(() => {
        if (stepperContextFn && typeof stepperContextFn === 'function') {
            stepperContextFn(isValid, watchAll)
        }
    }, [stepperContextFn, isValid, watchAll]);

    return (
        <div>
            <div>
                <InputLabel>Company Name</InputLabel>
                <TextInput {
                    ...register('companyName', {
                        required: 'Company name required'
                    })
                } />
                <InputError/>
            </div>
            <InputLabel>State</InputLabel>
            <div className="relative my-2 ring-2 ring-outline-high">
                <input 
                {
                    ...register('state', {
                        required: true
                    })
                }
                className={cn("w-72  h-12 p-2 border-2 rounded-lg border-black", {'ring-2 ring-outline-low': open})}
                onClick={() => setOpen(true)} />
                <DropdownRoot open={open} onOpenChange={setOpen}>
                    <DropdownTrigger asChild>
                        <div className="w-72 p-2 h-12 border-2 rounded-lg border-black absolute top-0 invisible">Open dropdown okay</div>
                    </DropdownTrigger>
                    <DropdownContent className="p-2 hover:cursor-pointer max-h-72 max-w-72 bg-surface-low rounded-lg shadow-lg overflow-scroll" >
                        {
                            STATES.map((state, index) => (
                                <DropdownItem key={index}
                                onClick={() => setValue('state', state, {
                                    shouldDirty: true
                                })}
                                className="px-3 outline-none py-1 mb-[2px] rounded-md hover:bg-solid-high hover:text-white">{state}</DropdownItem>
                            ))
                        }
                    </DropdownContent>
                </DropdownRoot>
            </div>
            <div>
                <InputLabel>District</InputLabel>
                <TextInput 
                {
                    ...register('district', {
                        required: 'Cannot be Empty'
                    })
                }
                />
                <InputError/>
            </div>
            <div>
                <InputLabel>City</InputLabel>
                <TextInput                 
                {
                    ...register('city', {
                        required: 'Cannot be Empty'
                    })
                } />
                <InputError/>
            </div>
        </div>
    )
}