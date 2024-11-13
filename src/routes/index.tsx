import { createBrowserRouter } from "react-router-dom";
import InvoiceHome from "../pages/Invoice";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <InvoiceHome />
    }
]

)