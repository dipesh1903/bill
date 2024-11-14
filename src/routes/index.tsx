import { createBrowserRouter, Navigate } from "react-router-dom";
import InvoiceHome from "../pages/Invoice";
import Settings from "../pages/settings";
import CompanySettings from "../pages/settings/company-settings";
import ProductSettings from "../pages/settings/product-settings";
import Stepper from "../components/stepper";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Stepper />,
        children: [
            {
                path: 'invoice',
                element: <InvoiceHome />
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