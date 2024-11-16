import { createBrowserRouter, Navigate } from "react-router-dom";
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
            // For Later use
            // {   
            //     path: 'settings',
            //     element: <Settings />,
            //     children: [
            //         {
            //             index: true,
            //             element: <Navigate replace to="company" />
            //         },
            //         {
            //             path: 'company',
            //             element: <CompanySettings />
            //         },
            //         {
            //             path: 'product',
            //             element: <ProductSettings />
            //         }
            //     ]
            // }
        ]
    }]

)