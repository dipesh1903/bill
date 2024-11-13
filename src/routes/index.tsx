import { createBrowserRouter, Navigate } from "react-router-dom";
import InvoiceHome from "../pages/Invoice";
import Settings from "../pages/settings";
import CompanySettings from "../pages/settings/company-settings";
import ProductSettings from "../pages/settings/product-settings";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <InvoiceHome />
    },
    {   
        path: 'settings',
        element: <Settings />,
        children: [
            {
                index: true,
                element: <Navigate replace to="company" />
            },
            {
                path: 'company',
                element: <CompanySettings />
            },
            {
                path: 'product',
                element: <ProductSettings />
            }
                ]
            }
        ]

)