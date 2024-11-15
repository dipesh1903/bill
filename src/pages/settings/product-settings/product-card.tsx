import { useReducer, useState } from "react"
import { DropdownRoot, DropdownTrigger, DropdownContent, DropdownItem } from "../../../components/ui/dropdown"
import { TextInput } from "../../../components/ui/input-string"
import { QuantityType } from "../../../constant"
import { cn } from "../../../utils/reactUtils"
import { useForm } from "react-hook-form"
import { PrimaryButton } from "../../../components/ui/button"
import { reducer, initValue } from "./reducer"
import { ProductSettingsMode, ProductSettingsType } from "./constant"
import { Products } from "../../../types/settings"
import { NumberInput } from "../../../components/ui/input-number"
import uuid from 'uuid-random';
import { productCardValues } from "../types"

type props = {
    type: ProductSettingsType,
    product?: Products,
    onSave: (product: Products) => void
}

export default function ProductCard({type = ProductSettingsType.CARD, product, onSave}: props) {
    const [open , setOpen] = useState(false);
    const [mode , setMode] = useState(type === ProductSettingsType.CARD ?  ProductSettingsMode.VIEW : ProductSettingsMode.EDIT);
    const [displayValue, dispatch] = useReducer(reducer, initValue);
    const {register, getValues,
        reset,
        setValue,
        formState: { isDirty, dirtyFields, isValid },
        setFocus} = useForm<productCardValues>({
        defaultValues: {
            productName: product ? product.productName : '',
            hsnCode: product ? product.hsnCode : undefined,
            rate: product ? product.rate : undefined,
            qty: product ? product.qty : QuantityType.KG
        }
    })

    function saveProduct() {
        if (!isValid) return;
        const result: Products = {
            ...product,
            productName: getValues().productName,
            rate: getValues().rate,
            qty: getValues().qty,
            hsnCode: getValues().hsnCode,
            id: product && product.id ? product.id : uuid()
        }
        onSave(result);
        setMode(ProductSettingsMode.VIEW)
    }

    return (
        <div className={cn("p-4 rounded-lg", {"shadow-product-cards-edit" : mode === ProductSettingsMode.EDIT,
            "shadow-product-cards": mode !== ProductSettingsMode.EDIT
        })}>
            {type === ProductSettingsType.FORM && <div className="flex justify-end mb-1">close</div> }
            <div className="relative">
                <div onClick={() => {
                    if (mode === ProductSettingsMode.EDIT) {
                        dispatch({
                            type: 'NAME',
                            value: true
                        })
                        setTimeout(() => {
                            setFocus('productName')
                    }); 
                    }}
                }
                className={cn(
                    "bg-surface-low mb-2 outline-none focus:ring-4 focus:ring-outline-low placeholder-outline-medium text-solid-high p-2 border-[2px] rounded-md border-solid-light w-full",
                    {'bg-yellow-100': type === ProductSettingsType.CARD && dirtyFields.productName && mode === ProductSettingsMode.EDIT}
                    )}>
                    {getValues().productName ||  'My product'}</div>
                <TextInput
                {
                    ...register('productName', {
                        required: 'Cannot be empty'
                    })
                }
                onBlur={() => dispatch({
                    type: 'NAME',
                    value: false
                })}
                className={cn("absolute top-0", {'invisible': !(displayValue.showNameInput || type === ProductSettingsType.FORM)})}
                placeholder="product name"
                autoFocus
                />
            </div>
            <div className="flex flex-row gap-4 pt-4">
                <div className="relative">
                    <div onClick={() => {
                        if (mode === ProductSettingsMode.EDIT) {
                            dispatch({
                                type: 'HSN',
                                value: true
                            })
                            setTimeout(() => {
                                setFocus('hsnCode')
                        });
                        } }} 
                        className={cn(
                            "bg-surface-low w-24 mb-2 outline-none focus:ring-4 focus:ring-outline-low placeholder-outline-medium text-solid-high p-2 border-[2px] rounded-md border-solid-light",
                            {'bg-yellow-100': type === ProductSettingsType.CARD && dirtyFields.hsnCode && mode === ProductSettingsMode.EDIT}
                            )}>
                            {getValues().hsnCode ||  'HSN NO.'}</div>
                        <NumberInput
                            {
                                ...register('hsnCode', {
                                    required: 'Cannot be empty'
                                })
                            }
                            className={cn("absolute top-0 flex-1 w-24", {'invisible': !displayValue.showHSNInput})}
                            placeholder="HSN"
                            onBlur={() => dispatch({
                                type: 'HSN',
                                value: false
                            })}
                            />
                </div>
                <div className="relative">
                    <div onClick={() => {
                        if (mode === ProductSettingsMode.EDIT) {
                            dispatch({
                                type: 'RATE',
                                value: true
                            })
                            setTimeout(() => {
                                setFocus('rate')
                        }); }}} 
                        className={cn(
                            "bg-surface-low mb-2 w-20 outline-none focus:ring-4 focus:ring-outline-low placeholder-outline-medium text-solid-high p-2 border-[2px] rounded-md border-solid-light",
                            {'bg-yellow-100': type === ProductSettingsType.CARD && dirtyFields.rate && mode === ProductSettingsMode.EDIT}
                            )}>
                            {getValues().rate ||  'Rate'}</div>
                        <NumberInput
                            {
                                ...register('rate', {
                                    required: 'Cannot be empty'
                                })
                            }
                            className={cn("flex-1 absolute top-0 w-20", {'invisible': !displayValue.showRateInput})}
                            placeholder="Rate"
                            onBlur={() => dispatch({
                                type: 'RATE',
                                value: false
                            })}
                            />
                </div>
                <div className="flex-1 relative max-w-20">
                    <TextInput
                    {
                        ...register('qty')
                    }
                    className={cn("w-full  h-fit p-2 border-2 rounded-lg border-black",
                        {'ring-2 ring-outline-low': open, 'bg-yellow-100': type === ProductSettingsType.CARD && dirtyFields.qty  && mode === ProductSettingsMode.EDIT})}
                        onClick={() => setOpen(true)} />
                    <DropdownRoot open={open && mode === ProductSettingsMode.EDIT} onOpenChange={setOpen}>
                        <DropdownTrigger asChild>
                            <div className="w-full p-2 h-full border-2 rounded-lg border-black absolute top-0 invisible">Open dropdown okay</div>
                        </DropdownTrigger>
                        <DropdownContent className="p-2 hover:cursor-pointer max-h-72 max-w-72 bg-surface-low rounded-lg shadow-lg overflow-scroll" >
                            {
                                Object.values(QuantityType).map((state, index) => (
                                    <DropdownItem key={index}
                                    onClick={() => setValue('qty', state , {shouldDirty: true})}
                                    className="px-3 outline-none py-1 mb-[2px] rounded-md hover:bg-solid-high hover:text-white">{state}</DropdownItem>
                                ))
                            }
                        </DropdownContent>
                    </DropdownRoot>
                </div>
            </div>
            <div className="flex gap-4 mt-4">
                { type === ProductSettingsType.CARD &&
                <PrimaryButton className="w-[50%] " onClick={() => {
                    dispatch({
                        type: 'NAME',
                        value: true
                    })
                    setTimeout(() => {
                        setMode(ProductSettingsMode.EDIT)
                        setFocus('productName')
                }); 
                    }}>Edit</PrimaryButton>
                }
                {
                    mode === ProductSettingsMode.EDIT && <PrimaryButton
                    onClick={() => { setMode(ProductSettingsMode.VIEW); reset()}}
                    >Cancel</PrimaryButton>
                }
                {isDirty && mode === ProductSettingsMode.EDIT && <PrimaryButton className="w-[50%]" onClick={saveProduct}>Save changes</PrimaryButton>}
            </div>
        </div>
    )
}