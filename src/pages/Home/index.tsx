import { Outlet } from "react-router-dom";
import { InputLabel } from "../../components/ui/input-label";
import { useForm } from "react-hook-form";
import { useContextDispatch, useContextStore } from "../../store/storageContext";
import { useEffect } from "react";

export default function HomePage() {
    const dispatch = useContextDispatch();
    const storage = useContextStore();
    const {register, watch} = useForm<{switchLocalStorage: boolean}>({
        defaultValues: {
            switchLocalStorage: storage.saveToLocal
        }
    });

    const watchSwitch = watch("switchLocalStorage");
    
    useEffect(() => {
        dispatch((prev) => ({
            ...prev,
            saveToLocal: watchSwitch
        }))
    }, [watchSwitch, dispatch])

    return(
        <div className="flex flex-col max-w-2xl overflow-hidden h-[100vh] m-auto">
            <nav className="bg-surface-high p-6 flex justify-between">
                <h1>Generate Cash Bill</h1>
                <div>
                <InputLabel className="inline-flex p-0 items-center cursor-pointer">
                    <input  type="checkbox"  className="sr-only peer"{
                        ...register("switchLocalStorage")
                    }
                    />
                    <div className="relative w-11 h-6 bg-outline-high peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-outline-medium dark:peer-focus:ring-outline-medium rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-solid-high peer-checked:text-white"></div>
                    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Save Locally</span>
                </InputLabel>
                </div>
            </nav>
            <main className="p-6 mt-4 h-[100%] overflow-scroll">
                <Outlet/>
            </main>
        </div>
    )
}