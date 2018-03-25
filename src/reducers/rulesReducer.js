import C from '../constant'

const initState = {
    rules: [],
    customerRule: null
}

const rulesState = (state = initState, action) => {
    switch (action.type) {

        case C.SET_REBATE_RULE:
            return {
                ...state,
                rules: action.payload
            }

        case C.SET_CUSTOMER_RULE:
            return {
                ...state,
                customerRule: action.payload
            }

        default: return state
    }
}

export default rulesState
