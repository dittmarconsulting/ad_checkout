import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { SplitButton, MenuItem} from 'react-bootstrap'

import { ActionCreator } from '../actions/index'

class CustomerSelector extends Component {

    constructor() {
        super()
        this.state = {
            title: 'Select a customer'
        }
    }

    componentDidMount() {
        // get all customers from server
        this.props.getCustomers()
    }

    _onSelect(customer) {
        const { setSelectedCustomer, getCustomerRule, resetOrders } = this.props
        // set the selected customer in redux store
        setSelectedCustomer(customer)
        // set the rule for the customer in redux store
        getCustomerRule(customer)
        // reset orders
        resetOrders()
        // set the title
        this.setState({title: customer.displayName})
    }

    render() {

        const { customers, headerText } = this.props
        const { title } = this.state

        return(
            <div style={styles.container}>
                <div style={styles.textContainer}>
                    <p style={styles.headerText}>{headerText}</p>
                </div>
                <div style={styles.selectContainer}>
                    <SplitButton
                        style={styles.dropDown}
                        id="split-button-pull-right"
                        title={title}
                        onSelect={::this._onSelect}>
                        {
                            customers.map(customer => {
                                return (
                                    <MenuItem
                                        key={customer.id}
                                        eventKey={customer}>
                                        {customer.displayName}
                                    </MenuItem>
                                )
                            })
                        }
                    </SplitButton>
                </div>
            </div>
        )
    }
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 70,
        borderColor: 'rgba(118, 118, 118, 0.2)',
        borderBottomWidth: 1,
        borderBottomStyle: 'solid'
    },
    textContainer: {
        marginLeft: 50
    },
    headerText: {
        margin: 0,
        fontSize: 26,
        fontWeight: '200',
        lineHeight: '20px',
        color: 'rgb(118, 118, 118)',
    },
    selectContainer: {
        marginRight: 50
    },
    dropDown: {
        width: 200
    }
}

// define the prop types
CustomerSelector.propTypes = {
    getCustomers: PropTypes.func.isRequired,
    setSelectedCustomer: PropTypes.func.isRequired,
    getCustomerRule: PropTypes.func.isRequired,
    resetOrders: PropTypes.func.isRequired,
    customers: PropTypes.array,
}

// pull in all required props into this container
const mapStateToProps = (state) => {
    return {
        customers: state.customersState.customers,
        selectedCustomer: state.customersState.selectedCustomer,
    }
}

// pull all required action creators into this container
const mapDispatchToProps = (dispatch) => {
    const action = bindActionCreators(ActionCreator, dispatch)
    return {
        getCustomers: action.getCustomers,
        setSelectedCustomer: action.setSelectedCustomer,
        getCustomerRule: action.getCustomerRule,
        resetOrders: action.resetOrders
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerSelector)
