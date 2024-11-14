import { NavLink, Outlet } from "react-router-dom";

export default function Settings() {
    return(
        <div className="flex flex-row">
            <div className="border-r-2 border-outline-high p-4 flex flex-col">
                <NavLink to="company"  
                style={({ isActive, isPending, isTransitioning }) => {
                    return {
                    background: isActive ? "yellow" : "",
                    color: isPending ? "red" : "black",
                    viewTransitionName: isTransitioning ? "slide" : "",
                    };
                }}>Company</NavLink>
                <NavLink to="product"
                style={({ isActive, isPending, isTransitioning }) => {
                    return {
                    background: isActive ? "yellow" : "",
                    color: isPending ? "red" : "black",
                    viewTransitionName: isTransitioning ? "slide" : "",
                    };
                }}>Product</NavLink>
            </div>
            <div className="flex-1 p-4">
                <Outlet />
            </div>
        </div>
    )
}