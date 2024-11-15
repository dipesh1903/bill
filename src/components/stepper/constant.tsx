import { stepConfigType } from "./type"

export const stepConfig: stepConfigType[] = [
    {
        label: 'step 1',
        description: <div className="whitespace-break-spaces pt-2 mr-6  text-[14px]">Company</div>,
        navigate: '/company'
    },
    {
        label: 'step 2',
        description: <div className="whitespace-break-spaces pt-2 mr-6 text-[14px]">Product</div>,
        navigate: '/product'
    },
    {
        label: 'step 3',
        description: <div className="whitespace-break-spaces pt-2 w-fit  text-[14px]">Invoice</div>,
        navigate: '/invoice'
    }
]