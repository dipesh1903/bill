import Step from "./step";
import { useRef, useState } from "react";
import { PrimaryButton } from "../ui/button";
import { cn } from "../../utils/reactUtils";
import { stepperValues } from "../../types/types";
import { stepConfig } from "./constant";
import CompanySettings from "../../pages/settings/company-settings";
import ProductSettings from "../../pages/settings/product-settings";
import InvoiceHome, { fieldType } from "../../pages/Invoice";
import { companySettingsForm } from "../../pages/settings/types";
import { Products } from "../../types/settings";

export default function Stepper() {

    // const navigate = useNavigate();
    const [activeStepper , setActiveStepper] = useState(1);
    const [isValid , setIsValid] = useState(false);
    // const location = useLocation();
    const formValues = useRef<{[key: string]: stepperValues}>({});
    console.log(formValues.current[2]);
    function onClick(index: number) {
        if (index > activeStepper && !isValid) return;
        setActiveStepper(index);
        // navigate(stepConfig[index - 1].navigate, {
        //     state: {
        //         value: formValues.current[String(index)]
        //     }
        // })
    }

    // useEffect(() => {
    //     console.log(location.pathname);
    //     const stepperIndex = stepConfig.findIndex(item => item.navigate === location.pathname) + 1;
    //     console.log(stepperIndex);
    //     if (stepperIndex > activeStepper && !isValid) {
    //         console.log('here');
    //         navigate(-1);
    //     } else {
    //         setActiveStepper(stepperIndex);
    //     }
    // }, [activeStepper, isValid, location, navigate])

    function stepperContextFn(isValid: boolean, values: stepperValues) {
        setIsValid(isValid)
        if (Array.isArray(values) || Object.keys(values).length) {
            formValues.current = {
                ...formValues.current,
                [String(activeStepper)]: Array.isArray(values) ? values : {
                    ...values
                }
            }
        }
        console.log(formValues.current[2]);
    }

    return(
        <div className="flex flex-col h-[100%]">
            <div className="flex flex-row items-start">
                {
                    stepConfig.map((item, index) => (
                        <Step id={index + 1}
                            className={`${index+1 === stepConfig.length ? "flex-grow-0 whitespace-nowrap" : ""}`}
                            active={activeStepper} key={index+1}
                            label={<div>{item.label}</div>}
                            divider={index+1 < stepConfig.length}
                            onClick={() => {onClick(index + 1)}}>
                            {item.description}
                        </Step>
                    ))
                }
            </div>
            <div className="mt-4 p-4 overflow-scroll bg-surface-medium rounded-lg">
                {
                    activeStepper === 1 ? <CompanySettings value={formValues.current[1] as companySettingsForm} stepperContextFns={stepperContextFn}/> :
                    activeStepper === 2 ? <ProductSettings value={(formValues.current[2] || []) as Products[]} stepperContextFns={stepperContextFn}/> :
                    activeStepper === 3 ? <InvoiceHome
                    value={formValues.current[3] as fieldType}
                    stepperContextFns={stepperContextFn}
                    companySetting={formValues.current[1] as companySettingsForm}
                    products={(formValues.current[2] || []) as Products[]}
                    /> : <div>Invalid stepper</div>
                }
            </div>
            <div className="flex justify-end gap-6 pt-4 bg-white">
                { activeStepper > 1 &&
                    <PrimaryButton
                    onClick={() => onClick(activeStepper - 1)}
                    className={cn("w-fit px-10")}>Previous</PrimaryButton>
                }
                { activeStepper < stepConfig.length &&
                    <PrimaryButton
                    onClick={() => onClick(activeStepper + 1)}
                    className={cn("w-fit px-10", {'bg-opacity-60 pointer-events-none cursor-not-allowed': !isValid})}>Next</PrimaryButton>
                }
            </div>
        </div>
    )
}