import React, { Component } from 'react'
import { SplitButton, MenuItem, FormControl, Button } from 'react-bootstrap'

class AdsRow extends Component {
    // onAction
    constructor() {
        super()
        this.state = {
            selectValue: 'Select a customer',
            quantityValue: 1
        }
    }

    componentDidMount() {
        const { type } = this.props
        this.setState({selectValue: type})
    }

    _onSelect(type) {
        this.setState({
            selectValue: type
        }, () => this._onAction())
    }

    _onKeyAction(e) {
        this.setState({
            quantityValue: e.target.value
        }, () => this._onAction())
    }

    _onAction() {
        const { selectValue, quantityValue } = this.state
        const { id, onAction } = this.props
        onAction({id, selectValue, quantityValue})
    }

    render(){

        const { id, onDeleteRow } = this.props
        const { selectValue, quantityValue } = this.state

        return (
            <div style={styles.container}>

                {/* ad type select */}
                <div style={{...styles.actionContainer, width: 350}}>
                    <p style={styles.descriptionText}>Select Type</p>
                    <SplitButton
                        style={styles.selectInput}
                        id={selectValue}
                        title={selectValue}
                        onSelect={::this._onSelect}>
                        <MenuItem eventKey="Classic">Classic</MenuItem>
                        <MenuItem eventKey="Standout">Standout</MenuItem>
                        <MenuItem eventKey="Premium">Premium</MenuItem>
                    </SplitButton>
                </div>

                {/* number input field */}
                <div style={{...styles.actionContainer, width: 200}}>
                    <p style={styles.descriptionText}>Quantity</p>
                    <FormControl
                        style={styles.numberInput}
                        type="number"
                        value={quantityValue}
                        placeholder="Enter Quantity"
                        onChange={::this._onKeyAction}
                    />
                </div>

                {/* delete button */}
                <div style={styles.buttonContainer}>
                    <Button
                        style={styles.deleteButton}
                        bsStyle="danger"
                        onClick={() => onDeleteRow(id)}>
                        -
                    </Button>
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
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: 50,
        paddingRight: 50,
        borderColor: 'rgba(118, 118, 118, 0.2)',
        borderBottomWidth: 1,
        borderBottomStyle: 'dotted'
    },
    actionContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 60
    },
    descriptionText: {
        margin: 0,
        fontSize: 18,
        fontWeight: '200',
        lineHeight: '25px',
        color: 'rgb(51, 51, 51)',
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

export default AdsRow
