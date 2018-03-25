import React, { Component } from 'react'
import { SplitButton, MenuItem, FormControl } from 'react-bootstrap'

class RuleRow extends Component {

    constructor() {
        super()
        this.state = {
            selectValue: 'Select price rule',
            selectedRule: null,
            quantityValue: 1,
            priceValue: 0,
            qtyFieldDisabled: false,
            priceFieldDisabled: false,
        }
    }

    /*
        - 'full' = 'Full Price'
        - 'x@' = 'Discount: X for Y'
        - 'x>389.99' = 'Discount for more than'
        - '*309.99' = 'Discount'
    */
    _ruleEncoder(rule) {
        switch (true) {
            case (rule.includes('@')):
                this.setState({
                    selectValue: 'Discount: X for Y',
                    selectedRule: '@',
                    quantityValue: rule.split('@')[0],
                    priceValue: 0,
                    qtyFieldDisabled: false,
                    priceFieldDisabled: true
                }, () => this._onAction())
                break
            case (rule.includes('>')):
                this.setState({
                    selectValue: 'Discount for more than',
                    quantityValue: rule.split('>')[0],
                    selectedRule: '>',
                    priceValue: rule.split('>')[1],
                    qtyFieldDisabled: false,
                    priceFieldDisabled: false
                }, () => this._onAction())
                break
            case (rule.includes('*')):
                this.setState({
                    selectValue: 'Discount',
                    selectedRule: '*',
                    priceValue: rule.split('*')[1],
                    qtyFieldDisabled: true,
                    priceFieldDisabled: false
                }, () => this._onAction())
                break
            default: this.setState({
                selectValue: 'Full Price',
                selectedRule: 'full',
                quantityValue: 0,
                priceValue: 0,
                qtyFieldDisabled: true,
                priceFieldDisabled: true
            }, () => this._onAction())
        }
    }

    componentDidMount() {
        this._ruleEncoder(this.props.customerRule)
    }

    componentWillReceiveProps(nextProps) {
        this._ruleEncoder(nextProps.customerRule)
    }

    _onSelect(type) {
        this._ruleEncoder(type)
    }

    _onQtyKeyAction(e) {
        this.setState(
            {quantityValue: e.target.value},
            () => this._onAction()
        )
    }

    _onPriceKeyAction(e) {
        this.setState(
            {priceValue: e.target.value},
            () => this._onAction()
        )
    }

    _onAction() {
        const { onAction } = this.props
        const { selectedRule, quantityValue, priceValue } = this.state
        /*
            - 'full' = 'Full Price'
            - 'x@' = 'Discount: X for Y'
            - 'x>389.99' = 'Discount for more than'
            - '*309.99' = 'Discount'
        */
        let ruleCode = null
        switch(selectedRule) {
            case '@': ruleCode = quantityValue + selectedRule
                break
            case '>': ruleCode = quantityValue + selectedRule + priceValue
                break
            case '*': ruleCode = selectedRule + priceValue
                break
            default: ruleCode = selectedRule
        }
        onAction(ruleCode)
    }

    render(){

        const { description } = this.props
        const { selectValue, quantityValue, priceValue,
                qtyFieldDisabled, priceFieldDisabled } = this.state

        return (
            <div style={styles.container}>

                {/* rule select */}
                <div style={{...styles.actionContainer, width: 310, marginRight: 60}}>
                    <p style={styles.descriptionText}>{description}</p>
                    <SplitButton
                        style={styles.selectInput}
                        id={selectValue}
                        title={selectValue}
                        onSelect={::this._onSelect}>
                        <MenuItem eventKey="">Full Price</MenuItem>
                        <MenuItem eventKey="3@">Discount: X for Y</MenuItem>
                        <MenuItem eventKey="3>0.00">Discount for more than</MenuItem>
                        <MenuItem eventKey="*0.00">Discount</MenuItem>
                    </SplitButton>
                </div>

                {/* number input field */}
                <div style={{...styles.actionContainer, width: 180, marginRight: 60}}>
                    <p style={styles.descriptionText}>Quantity</p>
                    <FormControl
                        style={styles.numberInput}
                        type="number"
                        value={quantityValue}
                        placeholder="Enter Quantity"
                        disabled={qtyFieldDisabled}
                        onChange={::this._onQtyKeyAction}
                    />
                </div>

                {/* number input field */}
                <div style={{...styles.actionContainer, width: 180}}>
                    <p style={styles.descriptionText}>Price</p>
                    <FormControl
                        style={styles.numberInput}
                        type="number"
                        value={priceValue}
                        placeholder="Enter Quantity"
                        disabled={priceFieldDisabled}
                        onChange={::this._onPriceKeyAction}
                    />
                </div>

            </div>
        )
    }
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderColor: 'rgba(118, 118, 118, 0.2)',
        borderBottomWidth: 1,
        borderBottomStyle: 'dotted'
    },
    actionContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    descriptionText: {
        margin: 0,
        fontSize: 18,
        fontWeight: '200',
        lineHeight: '25px',
        color: 'rgb(51, 51, 51)'
    },
    selectInput: {
        width: 200
    },
    numberInput: {
        width: 100
    },
    deleteButton: {
        width: 40
    }
}

export default RuleRow
