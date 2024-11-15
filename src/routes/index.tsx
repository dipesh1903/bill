import { createBrowserRouter, Navigate } from "react-router-dom";
import Settings from "../pages/settings";
import CompanySettings from "../pages/settings/company-settings";
import ProductSettings from "../pages/settings/product-settings";
import Stepper from "../components/stepper";
import HomePage from "../pages/Home";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage/>,
        children: [
            {
                index: true,
                element: <Navigate replace to={'bill'} />
            },
            {
                path: 'bill',
                element: <Stepper />,
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
    }]

)