import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'

import { ActionCreator } from '../actions/index'
import CustomerSelector from '../components/CustomerSelector'
import AdsRow from '../components/AdsRow'


class Checkout extends Component {

    constructor() {
        super()
        this.state = {
            orders: []
        }
    }

    componentDidMount() {
        const { getCustomerRules } = this.props
        // get all rules from server
        getCustomerRules()
    }

    _addRow(order) {
        const { addOrder } = this.props
        addOrder(order)
    }

    _onDeleteRow(orderId) {
        const { removeOrder } = this.props
        removeOrder(orderId)
    }

    _onAction(rowObj) {
        const { updateOrder } = this.props
        updateOrder(rowObj)
    }

    render() {

        const { orders, selectedCustomer, total } = this.props
        const curr = '$ ' + total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,") + ' AUD'

        // determine whether the add button is disabled or not
        const addDisabled = selectedCustomer ? false : true

        return (
            <div style={styles.container}>

                {/* header */}
                <CustomerSelector
                    headerText="Ads Checkout" />

                {/* add button */}
                <div style={styles.addTypeContainer}>
                    <div style={styles.addButtonContainer}>
                        <p style={styles.descriptionText}>Add an order</p>
                        <Button
                            bsStyle="success"
                            onClick={::this._addRow}
                            disabled={addDisabled}>
                            +
                        </Button>
                    </div>
                </div>

                {/* row container */}
                <div style={styles.rowContainer}>
                    <div style={styles.adRowsContainer}>
                        {
                            orders.map(order =>
                                <AdsRow
                                    key={order.id}
                                    {...order}
                                    onAction={::this._onAction}
                                    onDeleteRow={::this._onDeleteRow}/>
                            )
                        }
                    </div>
                </div>

                {/* total price container */}
                <div style={styles.totalContainer}>
                    <div style={styles.totalTextContainer}>
                        <p style={styles.descriptionText}>{curr}</p>
                    </div>
                </div>

            </div>
        )
    }
}

// component style
const styles = {
    container: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        height: 400,
        margin: 30,
        backgroundColor: 'rgba(0, 118, 118, 0.06)'
    },
    addTypeContainer: {
        display: 'flex',
        height: 70,
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderColor: 'rgba(118, 118, 118, 0.2)',
        borderBottomWidth: 1,
        borderBottomStyle: 'solid'
    },
    addButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 170,
        marginRight: 50
    },
    descriptionText: {
        margin: 0,
        fontSize: 20,
        fontWeight: '200',
        lineHeight: '25px',
        color: 'rgb(51, 51, 51)',
    },
    rowContainer: {
        display: 'flex',
        flex: 1,
        borderColor: 'rgba(118, 118, 118, 0.2)',
        borderBottomWidth: 1,
        borderBottomStyle: 'solid'
    },
    adRowsContainer: {
        flex: 1,
        alignItems: 'stretch',
        overflow: 'scroll'
    },
    totalContainer: {
        display: 'flex',
        height: 70,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    totalTextContainer: {
        marginRight: 50
    }
}

// define the prop types
Checkout.propTypes = {
    getCustomerRules: PropTypes.func.isRequired,
    addOrder: PropTypes.func.isRequired,
    updateOrder: PropTypes.func.isRequired,
    removeOrder: PropTypes.func.isRequired,
    orders: PropTypes.array,
    total: PropTypes.number
}

// pull in all required props into this container
const mapStateToProps = (state) => {
    return {
        selectedCustomer: state.customersState.selectedCustomer,
        orders: state.orderState.orders,
        total: state.orderState.total
    }
}

// pull all required action creators into this container
const mapDispatchToProps = (dispatch) => {
    const action = bindActionCreators(ActionCreator, dispatch)
    return {
        getCustomerRules: action.getCustomerRules,
        addOrder: action.addOrder,
        updateOrder: action.updateOrder,
        removeOrder: action.removeOrder
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
