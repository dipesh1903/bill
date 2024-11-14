import { useState } from "react";
import { PrimaryButton } from "../../../components/ui/button";
import { Products } from "../../../types/settings";
import { ProductSettingsType } from "./constant";
import ProductCard from "./product-card";
import { useLocation, useOutletContext } from "react-router-dom";
import { stepperContextFnType } from "../../../types/types";

export default function ProductSettings({value}: {value?: Products[]}) {
    const { state } = useLocation();
    console.log('state is ', state);
    const [products , setProducts] = useState<Products[]>(state && state.value ? state.value : (value || []));
    const [showCard, setShowCard] = useState(false);
    const [stepperContextFn] = useOutletContext<[stepperContextFnType]>();
    function onSave(product: Products) {
        setProducts([...products, product]);
        stepperContextFn(true, [...products, product]);
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
                products.map(product => (
                    <div
                        key={product.id} 
                        className="my-2">
                        <ProductCard type={ProductSettingsType.CARD}
                        product={product}
                        onSave={onSave}/>
                    </div>
                ))
            }
        </div>
    )
}