

// ad list could be a 'todo style' approach

/*
    calculation rules

    @ Assumption: if one buys 3 for the price of 2 (3x2) than the 3-1 price will
    also apply for all number of items greater than 3. Hence if one buys 5 items
    with the price will be 5-1

    - 'full' = items * full price
    - 'x@' = (items >= x) ? (items - 1) * full price : full price
    - 'x>389.99' = (items >= x) ? custom price : full price
    - 'custom*309.99' = items * custom price
*/

const priceList = {
    classic: 269.99,
    standout: 322.99,
    premium: 394.99
}

const customerRules = {
    default: {
        classic: 'full',
        standout: 'full',
        premium: 'full'
    },
    unilever: {
        classic: '3@',  // 3 for 2
        standout: 'full',
        premium: 'full',
    },
    apple: {
        classic: 'full',
        standout: '*299.99',
        premium: 'full',
    },
    nike: {
        classic: 'full',
        standout: 'full',
        premium: '4>379.99'  // 4 or more for 379.99
    },
    ford: {
        classic: '5@', // 5 for 4 = 4 x classic =
        standout: '*309.99', // 309.99
        premium: '3>389.99' // 3 or more for 389.99
    }
}

class Checkout {
    // passing the rules into the constructor
    constructor(pricingRules) {
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
    add(type) {
        // count counter up for one of the types
        this.counter[type]++
        // add the type to the array
        this.adsArray.push(type)
    }
    // [`standout`, `standout`, `standout`, `premium`]
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
    // get the total value
    getTotal() {
        // remove doublicates
        const newTypeArr = Array.from(new Set(this.adsArray))
        console.log(newTypeArr)
        // loop over new array calculate the total
        newTypeArr.map(item => this._calcTotal(item))
        // return the total
        return this.total
    }
}

/*

Customer: default
ID added: `classic`, `standout`, `premium`
Total expected: $987.97

Customer: Unilever
SKUs Scanned: `classic`, `classic`, `classic`, `premium`
Total expected: $934.97

Customer: Apple
SKUs Scanned: `standout`, `standout`, `standout`, `premium`
Total expected: $1294.96

Customer: Nike
SKUs Scanned: `premium`, `premium`, `premium`, `premium`
Total expected: $1519.96

Customer: Ford
SKUs Scanned: `classic`, `premium`, `premium`, `premium`
Total expected: $1519.96

*/

const pricingRules = {
    priceList,
    customerRule: customerRules.default
}

const co = new Checkout(pricingRules)
co.add('classic')
co.add('standout')
//co.add('classic')
co.add('premium')
//co.getTotal()

console.log(co.getTotal())
