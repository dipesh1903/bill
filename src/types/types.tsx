import { fieldType } from "../pages/Invoice";
import { companySettingsForm } from "../pages/settings/types";
import { Products } from "./settings";

export type stepperValues = fieldType | companySettingsForm | Products[]
export type stepperContextFnType = (isValid: boolean, selectedValues: stepperValues) => void