import C from '../constant'

const initState = {
    orders: [],
    total: 0
}

const orderState = (state = initState, action) => {
    switch (action.type) {

        case C.SET_ORDERS:
            return {
                ...state,
                orders: action.payload
            }

        case C.SET_TOTAL:
            return {
                ...state,
                total: action.payload
            }

        default: return state
    }
}

export default orderState
