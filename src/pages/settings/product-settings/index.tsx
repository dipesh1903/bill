import { useState } from "react";
import { PrimaryButton } from "../../../components/ui/button";
import { Products } from "../../../types/settings";
import { ProductSettingsType } from "./constant";
import ProductCard from "./product-card";

export default function ProductSettings() {
    const [products , setProducts] = useState<Products[]>(() => {
        try {
            return JSON.parse(localStorage.getItem('products') || '[]')
        } catch {
            return []
        }
    });
    const [showCard, setShowCard] = useState(false);
    function onSave(product: Products) {
        setProducts([...products, product]);
        localStorage.setItem('products', JSON.stringify([...products, product]));
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
                    <div className="my-2">
                        <ProductCard type={ProductSettingsType.CARD}
                        product={product}
                        onSave={onSave}/>
                    </div>
                ))
            }
        </div>
    )
}