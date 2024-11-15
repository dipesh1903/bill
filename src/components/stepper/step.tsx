import { ReactNode } from "react"
import { cn } from "../../utils/reactUtils"

type props = {
    children: ReactNode,
    label: ReactNode,
    onClick: () => void,
    active: number
    divider?: boolean,
    id: number
    className: string,
}

export default function Step({children, label, divider, onClick, active, id, className}: props) {
    return (
        <div className={cn("flex flex-col justify-center flex-1", className)}>
            <div className="flex items-center">
                <div
                onClick={onClick}
                className={cn("p-2 py-4 text-[12px] w-fit border-outline-high border-[1px] rounded-[100%] bg-surface-low",
                    { 'bg-solid-medium text-white': active === id || id < active, 'shadow-step-border-inset': id < active}
                )}>
                    {label}
                </div>
                {divider && <div className={cn("flex-1 h-[2px] bg-outline-medium", {'bg-solid-high': id < active})}></div>}
            </div>
            {children}
        </div>
    )
}