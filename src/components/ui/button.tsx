import {forwardRef, HTMLAttributes } from "react"
import { cn } from "../../utils/reactUtils";


const PrimaryButton = forwardRef<HTMLButtonElement, HTMLAttributes<HTMLButtonElement>>(
    ({className, ...props}, ref) => (
    <button 
        ref={ref}
        className={cn("w-full bg-solid-medium text-white text-center rounded-md px-2.5 py-2  hover:bg-solid-light", className)} 
        {...props}/>
))

export { PrimaryButton };
