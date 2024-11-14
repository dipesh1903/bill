import { stepConfigType } from "./type"

export const stepConfig: stepConfigType[] = [
    {
        label: 'name',
        description: <div className="whitespace-break-spaces text-[14px]">Company details</div>,
        navigate: '/company'
    },
    {
        label: 'name',
        description: <div className="whitespace-break-spaces text-[14px]">Product details</div>,
        navigate: '/product'
    },
    {
        label: 'name',
        description: <div className="whitespace-break-spaces text-[14px]">Generate Invoice</div>,
        navigate: '/invoice'
    }
]