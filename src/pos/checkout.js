/*
this class is the interface to the checkout system
*/

export default class Checkout {

    // passing the rules into the constructor
    constructor(pricingRules) {
        this.customerName = pricingRules.customerName
        this.priceList = pricingRules.priceList
        this.rules = pricingRules.customerRule
        this.adsArray = []
        this.counter = {
            classic: 0,
            standout: 0,
            premium: 0
        }
        this.total = 0
    }

    // add ad type to ads array
    add(type) {
        // count counter up for one of the types
        this.counter[type]++
        // add the type to the array
        this.adsArray.push(type)
    }

    // calculate the total
    _calcTotal(type) {
        // get rule for the type
        const priceRule = this.priceList[type]
        // get price for type
        const customerRule = this.rules[type]
        // get the counter for the type
        const typeCounter = this.counter[type]
        // set the rebate number
        let rebateNumber = 0
        // set the custom price variable
        let customPrice = 0
        // determine the rules
        switch (true) {
            // no rebates - customer pays full price
            case customerRule.includes('full'):
                // calcuate price and add to total
                this.total += typeCounter * priceRule
            break
            // rebate for instance 3 for the price of 2
            case customerRule.includes('@'):
                // extract the rebate number from rule ('3@' = 3)
                rebateNumber = customerRule.split('@')[0]
                // calcuate price and add to total
                // 'x@' = (typeCounter >= x) ? (typeCounter - 1) * full price : full price
                this.total += (typeCounter >= rebateNumber)
                    ? (typeCounter - 1) * priceRule
                    : typeCounter * priceRule
            break
            // rebate for buying more than 4 items
            case customerRule.includes('>'):
                // extract the rebate number from rule ('4>379.99' = 4)
                rebateNumber = customerRule.split('>')[0]
                // extract the custom price from rule ('4>379.99' = 379.99)
                customPrice = customerRule.split('>')[1]
                // calcuate price and add to total
                this.total += (typeCounter >= rebateNumber)
                    ? (typeCounter * customPrice)
                    : (typeCounter * priceRule)
            break
            // rebates price
            case customerRule.includes('*'):
                // extract the custom price from rule
                customPrice = customerRule.split('*')[1]
                // calcuate price and add to total
                this.total += typeCounter * customPrice
            break
            default: this.total += 0
        }
    }

    // get the total
    getTotal() {
        // remove doublicates
        const newTypeArr = Array.from(new Set(this.adsArray))
        // loop over new array calculate the total
        newTypeArr.map(item => this._calcTotal(item))
        // return the total
        return this.total
    }
}
