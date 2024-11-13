import {forwardRef, LabelHTMLAttributes } from "react";


const InputError = forwardRef<
HTMLSpanElement,
LabelHTMLAttributes<HTMLSpanElement>
>(({...props}, ref) => 
    <span ref={ref} {...props} className="block text-sm text-light-error italic pb-2"></span>
)

InputError.displayName = 'InputError';
export default InputError;
