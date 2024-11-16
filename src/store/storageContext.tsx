/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { companySettingsForm } from "../pages/settings/types";
import { BillSettings, Products } from "../types/settings";
import { LOCAL_STORAGE_KEY, storePersist } from "./storagePersist";


export type contextType = {
    saveToLocal: boolean,
    companySettings: companySettingsForm,
    products: Products[],
    settings: BillSettings
}
const storageContextValue = createContext<contextType>({} as contextType);
const dispatchContext = createContext<React.Dispatch<React.SetStateAction<contextType>>>(() => {});


export function StorageContext({children}: {children: ReactNode} ) {
    const [state, setState] = useState<contextType>(storePersist.get(LOCAL_STORAGE_KEY.BILL_GENERATOR_DETAILS) || {});
    useEffect(() => {
        if (Object.keys(state).length) {
            if (state.saveToLocal) {
                storePersist.set(LOCAL_STORAGE_KEY.BILL_GENERATOR_DETAILS, state)
            } else {
                storePersist.remove(LOCAL_STORAGE_KEY.BILL_GENERATOR_DETAILS)
            }
        }
    }, [state]) 

    return (
        <storageContextValue.Provider value={state}>
            <dispatchContext.Provider value={setState}>
                {children}
            </dispatchContext.Provider>
        </storageContextValue.Provider>
    )
}

export function useContextStore(): contextType {
    return useContext(storageContextValue)
}

export function useContextDispatch(): React.Dispatch<React.SetStateAction<contextType>> {
    return useContext(dispatchContext)
}