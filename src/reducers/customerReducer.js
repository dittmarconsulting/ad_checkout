import C from '../constant'

const initState = {
    customers: [],
    selectedCustomer: null
}

const customersState = (state = initState, action) => {
    switch (action.type) {

        case C.SET_CUSTOMERS:
            return {
                ...state,
                customers: action.payload
            }

        case C.SET_SELECTED_CUSTOMER:
            return {
                ...state,
                selectedCustomer: action.payload
            }

        default: return state
    }
}

export default customersState
