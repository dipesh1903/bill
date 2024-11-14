import { Outlet, useNavigate } from "react-router-dom";
import Step from "./step";
import { useCallback, useRef, useState } from "react";
import { PrimaryButton } from "../ui/button";
import { cn } from "../../utils/reactUtils";
import { stepConfigType } from "./type";
import { stepperValues } from "../../types/types";
import { stepConfig } from "./constant";

export default function Stepper() {

    const navigate = useNavigate();
    const [activeStepper , setActiveStepper] = useState(1);
    const [isValid , setIsValid] = useState(true);
    const formValues = useRef<{[key: string]: stepperValues}>({});

    function onClick(index: number, item: stepConfigType) {
        setActiveStepper(index);
        navigate(item.navigate, {
            state: {
                value: formValues.current[String(index)]
            }
        })
    }

    function stepperContextFn(isValid: boolean, values: stepperValues) {
        setIsValid(isValid)
        if (Object.keys(values).length) {
            formValues.current = {
                ...formValues.current,
                [String(activeStepper)]: Array.isArray(values) ? values : {
                    ...values
                }
            }
        }
    }

    return(
        <div>
            <div className="flex flex-row items-start">
                {
                    stepConfig.map((item, index) => (
                        <Step id={index + 1}
                            active={activeStepper} key={index+1}
                            label={<div>{item.label}</div>}
                            divider={index+1 < stepConfig.length}
                            onClick={() => onClick(index + 1, item)}>
                            {item.description}
                        </Step>
                    ))
                }
                {/* <Step label={<div>name</div>} divider={true} onClick={() => navigate('/company')}>
                    <div className="whitespace-break-spaces text-[14px]">Company details</div>
                </Step>
                <Step label={<div>name</div>} divider={true} onClick={() => navigate('/product')}>
                    <div className="whitespace-break-spaces" >Product details</div>
                </Step>
                <Step label={<div>name</div>} onClick={() => navigate('/invoice')}>
                <div className="whitespace-break-spaces">Generate Invoice</div>
                </Step> */}
            </div>
            <div>
                <Outlet context={[useCallback(stepperContextFn, [activeStepper])]}/>
            </div>
            <div>
                <PrimaryButton className={cn("bg-slate-800", {'bg-red-900': !isValid})}>Next</PrimaryButton>
            </div>
        </div>
    )
}