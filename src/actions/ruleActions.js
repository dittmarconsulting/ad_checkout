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
        // get the customer rule array
        const ruleData = getState().rulesState.rules
        // find the rule for the customer
        const customerRule = ruleData.find(rule =>
            rule.customerName.toLowerCase() === idName.toLowerCase()
        )
        dispatch(setCustomerRule(customerRule))
    }

export const updateCustomerRule = (type, rule) =>
    (dispatch, getState) => {
        let newRuleObj = {}
        // get the rule for the customer
        const customerRule = getState().rulesState.customerRule
        // write the new rule to customerRule
        if(customerRule.rule[type] !== rule) {
            newRuleObj = {
                ...customerRule,
                rule: {
                    ...customerRule.rule,
                    [type]: rule
                }
            }
            dispatch(setCustomerRule(newRuleObj))
        }
    }

    export const saveCustomerRule = () =>
        (dispatch, getState) => {
            // get the rule for the customer
            const customerRule = getState().rulesState.customerRule
            // get the customer rule array
            const ruleData = getState().rulesState.rules
            // make changes to the customer rule in array
            const newRuleArr = ruleData.map(ruleObj => {
                if(customerRule.customerName === ruleObj.customerName) {
                    return customerRule
                } else {
                    return ruleObj
                }
            })
            console.log(JSON.stringify(newRuleArr, null, 4))
            // make a AJAX call
        }
