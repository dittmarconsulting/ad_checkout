import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'

import { ActionCreator } from '../actions/index'
import CustomerSelector from '../components/CustomerSelector'
import RuleRow from '../components/RuleRow'

class RulesManagement extends Component {

    componentDidMount() {
        const { getCustomerRules, setSelectedCustomer } = this.props
        // get all rules from server
        getCustomerRules()
        // reset the selected cutomer
        setSelectedCustomer(null)
    }

    _onClassicAction(rule) {
        this.props.updateCustomerRule('classic', rule)
    }

    _onStandoutAction(rule) {
        this.props.updateCustomerRule('standout', rule)
    }

    _onPremiumAction(rule) {
        this.props.updateCustomerRule('premium', rule)
    }

    _onSave(type, rule) {
        this.props.saveCustomerRule()
    }

    render(){

        const { selectedCustomer, customerRule } = this.props
        const saveDisabled = selectedCustomer ? false : true

        return (
            <div style={styles.container}>

                {/* header */}
                <CustomerSelector
                    headerText="Customer Rules" />

                <div style={styles.rowContainer}>
                {
                    (selectedCustomer &&
                    <div>

                        {/* classic rule row */}
                        <RuleRow
                            customerRule={customerRule ? customerRule.rule.classic : {}}
                            description="Classic"
                            onAction={::this._onClassicAction}/>

                        {/* standout rule row */}
                        <RuleRow
                            customerRule={customerRule ? customerRule.rule.standout : {}}
                            description="Standout"
                            onAction={::this._onStandoutAction}/>

                        {/* premium rule row */}
                        <RuleRow
                            customerRule={customerRule ? customerRule.rule.premium : {}}
                            description="Premium"
                            onAction={::this._onPremiumAction}/>

                    </div>)
                }
                </div>

                <div style={styles.saveContainer}>
                    <Button
                        style={styles.deleteButton}
                        bsStyle="success"
                        disabled={saveDisabled}
                        onClick={::this._onSave}>
                        Save
                    </Button>
                </div>

            </div>
        )
    }
}

const styles = {
    container: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        height: 290,
        margin: 30,
        backgroundColor: 'rgba(0, 118, 118, 0.06)'
    },
    rowContainer: {
        height: 150,
        borderColor: 'rgba(118, 118, 118, 0.2)',
        borderBottomWidth: 1,
        borderBottomStyle: 'solid'
    },
    descriptionText: {
        margin: 0,
        fontSize: 20,
        fontWeight: '200',
        lineHeight: '25px',
        color: 'rgb(51, 51, 51)',
    },
    saveContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginRight: 50,
        height: 70
    }
}

// define the prop types
RulesManagement.propTypes = {
    getCustomerRules: PropTypes.func.isRequired,
    setSelectedCustomer: PropTypes.func.isRequired,
    updateCustomerRule: PropTypes.func.isRequired,
    saveCustomerRule: PropTypes.func.isRequired
}

// pull in all required props into this container
const mapStateToProps = (state) => {
    return {
        selectedCustomer: state.customersState.selectedCustomer,
        customerRule: state.rulesState.customerRule
    }
}

// pull all required action creators into this container
const mapDispatchToProps = (dispatch) => {
    const action = bindActionCreators(ActionCreator, dispatch)
    return {
        getCustomerRules: action.getCustomerRules,
        setSelectedCustomer: action.setSelectedCustomer,
        updateCustomerRule: action.updateCustomerRule,
        saveCustomerRule: action.saveCustomerRule
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RulesManagement)
