import { stepConfigType } from "./type"

export const stepConfig: stepConfigType[] = [
    {
        label: 'name',
        description: <div className="whitespace-break-spaces pt-2 mr-6  text-[14px]">Company</div>,
        navigate: '/company'
    },
    {
        label: 'name',
        description: <div className="whitespace-break-spaces pt-2 mr-6 text-[14px]">Product</div>,
        navigate: '/product'
    },
    {
        label: 'name',
        description: <div className="whitespace-break-spaces pt-2 w-fit  text-[14px]">Invoice</div>,
        navigate: '/invoice'
    }
]