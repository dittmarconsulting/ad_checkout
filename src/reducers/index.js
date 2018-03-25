import { combineReducers } from 'redux'

import rulesState from './rulesReducer'
import customersState from './customerReducer'
import orderState from './orderReducer'

export default combineReducers({
    rulesState,
    customersState,
    orderState
})
