import { Outlet } from "react-router-dom";

export default function HomePage() {
    return(
        <div className="flex flex-col max-w-2xl overflow-hidden h-[100vh] m-auto">
            <nav className="bg-surface-high p-6">
                <h1>Generate Cash Bill</h1>
            </nav>
            <main className="p-6 mt-4 h-[100%] overflow-scroll">
                <Outlet/>
            </main>
        </div>
    )
}