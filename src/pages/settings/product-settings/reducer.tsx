export const initValue = {
    showNameInput: false,
    showHSNInput: false,
    showRateInput: false,
    showQtyTypeInput: false
}

type actionType = {
    type: string,
    value: boolean
}

export function reducer(state: typeof initValue, action: actionType): typeof initValue {
    switch(action.type) {
        case 'NAME': {
            return {
                ...state,
                showNameInput: action.value
            }
        }
        case 'HSN': {
            return {
                ...state,
                showHSNInput: action.value
            }
        }
        case 'RATE': {
            return {
                ...state,
                showRateInput: action.value
            }
        }
        case 'QTY_TYPE': {
            return {
                ...state,
                showQtyTypeInput: action.value
            }
        }
        default:
            return state;
    }
}