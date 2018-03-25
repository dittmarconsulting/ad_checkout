import C from '../constant'
import Checkout from '../pos/checkout'
import priceList from '../pos/priceList'

export const setOrders = (arrayData) => {
    return {
        type: C.SET_ORDERS,
        payload: arrayData
    }
}

export const setTotal = (numberData) => {
    return {
        type: C.SET_TOTAL,
        payload: numberData
    }
}

export const resetOrders = () =>
    dispatch => {
        // reset the order
        dispatch(setOrders([]))
        // reset total
        dispatch(setTotal(0))
    }

export const addOrder = (order) =>
    (dispatch, getState) => {
        const orders = getState().orderState.orders
        const newOrders = [
            ...orders,
            {
                id: orders.length + 1,
                type: 'Classic', // default for new order
                qty: 1
            }
        ]
        dispatch(setOrders(newOrders))
        // calculate the total
        dispatch(calculateTotal())
    }

// {id: 1, selectValue: "Classic", quantityValue: "1"}
export const updateOrder = (orderObj) =>
    (dispatch, getState) => {
        const orders = getState().orderState.orders
        const newOrders = orders.map(order => {
            if(order.id === orderObj.id) {
                return {
                    ...order,
                    type: orderObj.selectValue,
                    qty: parseInt(orderObj.quantityValue, 10)
                }
            } else {
                return order
            }
        })
        dispatch(setOrders(newOrders))
        // calculate the total
        dispatch(calculateTotal())
    }

export const removeOrder = (orderId) =>
    (dispatch, getState) => {
        const orders = getState().orderState.orders
        const newOrders = orders.filter(order => order.id !== orderId)
        dispatch(setOrders(newOrders))
        // calculate the total
        dispatch(calculateTotal())
    }

const calculateTotal = () =>
    (dispatch, getState) => {

        // get the selected customer name
        const customerName = getState().customersState.selectedCustomer.idName

        // get the customer rules
        const customerRule = getState().rulesState.customerRule.rule

        // create a new pricing rule object
        const pricingRules = {customerName, priceList, customerRule}

        // create a new Checkout object
        const co = new Checkout(pricingRules)

        // get all the orders
        const orders = getState().orderState.orders

        // loop over the orders
        /*eslint-disable */
        orders.map(order => {
            // read the "qty" property and loop
            const a = [...Array(order.qty).keys()].map(() => {
                // add the type to the Checkout object
                co.add(order.type.toLowerCase())
            })
        })
        /*eslint-enable */

        // get the total and set it in the store
        dispatch(setTotal(co.getTotal()))
    }
