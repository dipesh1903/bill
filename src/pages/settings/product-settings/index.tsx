import { useEffect, useState } from "react";
import { PrimaryButton } from "../../../components/ui/button";
import { Products } from "../../../types/settings";
import { ProductSettingsType } from "./constant";
import ProductCard from "./product-card";
import { useLocation, useOutletContext } from "react-router-dom";
import { stepperContextFnType } from "../../../types/types";

export default function ProductSettings({value, stepperContextFns}: {value?: Products[], stepperContextFns?: stepperContextFnType}) {
    const { state } = useLocation();
    const [products , setProducts] = useState<Products[]>(() => {
    return state && state.value ? (state.value || []) : (value ? value : [])
    });
    const [showCard, setShowCard] = useState(false);
    const stepperContextFn = useOutletContext<[stepperContextFnType]>();

    useEffect(() => {
        if (stepperContextFn && stepperContextFn[0] && typeof stepperContextFn[0] === 'function') {
            stepperContextFn[0](!!products.length, products);
        } else if (stepperContextFns && typeof stepperContextFns === 'function') {
            stepperContextFns(!!products.length, products);
        }
    }, [products, stepperContextFn, stepperContextFns])

    function onSave(product?: Products, index?: number) {
        if (product) {
            if (index || index === 0) {
                const result = [...products]
                result[index] = product;
                setProducts([...result]);
            } else {
                setProducts([...products, product]);
            }
        } else {
            if (index || index === 0) {
                const result = [...products]
                result.splice(index, 1)
                setProducts([...result]);
            }
        }
        setShowCard(false);
    }

    return (
        <div>
            <PrimaryButton className="mb-2" onClick={() => setShowCard(true)}>Add Product</PrimaryButton>
            {
                showCard &&  <div className="my-2"><ProductCard type={ProductSettingsType.FORM}
                onSave={onSave}/></div>
            }
            {
                products.map((product, index) => (
                    <div
                        key={product.id} 
                        className="my-2">
                        <ProductCard type={ProductSettingsType.CARD}
                        product={product}
                        onSave={(product?: Products) => onSave(product, index)}/>
                    </div>
                ))
            }
        </div>
    )
}