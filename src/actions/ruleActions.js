import C from '../constant'
import ruleData from '../restData/ruleData'

export const setCustomerRules = (arrayData) => {
    return {
        type: C.SET_REBATE_RULE,
        payload: arrayData
    }
}

export const setCustomerRule = (objectData) => {
    return {
        type: C.SET_CUSTOMER_RULE,
        payload: objectData
    }
}

export const getCustomerRules = () =>
    dispatch => {
        // simulate a rest call
        setTimeout(() => {
            dispatch(setCustomerRules(ruleData))
        }, 1000)
    }

export const getCustomerRule = ({idName}) =>
    (dispatch, getState) => {
        // find the rule for the customer
        const ruleData = getState().rulesState.rules
        // find the rule for the customer
        const customerRule = ruleData.find(rule =>
            rule.customerName.toLowerCase() === idName.toLowerCase()
        )
        dispatch(setCustomerRule(customerRule))
    }
