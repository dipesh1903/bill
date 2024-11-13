import { Outlet } from "react-router-dom";

export default function Settings() {
    return(
        <div>
            <div>
                <div>Company</div>
                <div>Product</div>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}