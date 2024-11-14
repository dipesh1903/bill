import { ReactNode } from "react"
import { cn } from "../../utils/reactUtils"

type props = {
    children: ReactNode,
    label: ReactNode,
    onClick: () => void,
    active: number
    divider?: boolean,
    id: number
}

export default function Step({children, label, divider, onClick, active, id}: props) {
    return (
        <div className="flex flex-col justify-center flex-1">
            <div className="flex items-center">
                <div
                onClick={onClick}
                className={cn("p-2 py-3 text-[12px] w-fit border-outline-high border-[1px] rounded-[100%] bg-surface-low",
                    { 'bg-solid-medium text-white': active === id }
                )}>
                    {label}
                </div>
                {divider && <div className="flex-1 h-[2px] bg-outline-medium"></div>}
            </div>
            {children}
        </div>
    )
}