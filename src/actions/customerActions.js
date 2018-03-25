import C from '../constant'
import customerData from '../restData/customerData'

export const setCustomers = (arrayData) => {
    return {
        type: C.SET_CUSTOMERS,
        payload: arrayData
    }
}

export const setSelectedCustomer = (objectData) => {
    return {
        type: C.SET_SELECTED_CUSTOMER,
        payload: objectData
    }
}

export const getCustomers = () =>
    dispatch => {
        // simulate a rest call
        setTimeout(() => {
            dispatch(setCustomers(customerData))
        }, 1000)
    }
