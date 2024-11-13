import { forwardRef, LabelHTMLAttributes } from "react";
import { cn } from "../../utils/reactUtils";

export const InputLabel = forwardRef<HTMLLabelElement, LabelHTMLAttributes<HTMLLabelElement>>(
        ({className, ...props}, ref) => 
            <label
                ref={ref}
                className={cn(
                    "text-solid-high mb-2",className
                )}
                {...props}
            />
    )