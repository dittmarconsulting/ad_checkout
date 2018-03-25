/*
    this unit test file tests all checkout rules
*/

import Checkout from '../src/pos/checkout'
import priceList from '../src/pos/priceList'

/*
    Customer: default
    ID added: `classic`, `standout`, `premium`
    Total expected: $987.97
*/
it('expect total 987.97 for default customer', () => {

    // create the pricing rule for the default customer
    const pricingRules = {
        customerName: 'default',
        priceList,
        customerRule: {
            classic: 'full',
            standout: 'full',
            premium: 'full'
        }
    }

    const co = new Checkout(pricingRules)
    co.add('classic')
    co.add('standout')
    co.add('premium')

    expect(co.getTotal()).toBe(987.97)
})

/*
    Customer: Unilever
    SKUs Scanned: `classic`, `classic`, `classic`, `premium`
    Total expected: $934.97
*/
it('expect total 934.97 for customer Unilever', () => {

    // create the pricing rule for unilever
    const pricingRules = {
        customerName: 'unilever',
        priceList,
        customerRule: {
            classic: '3@',  // 3 for 2 = 2 x classic = 539.89
            standout: 'full',
            premium: 'full'
        }
    }

    const co = new Checkout(pricingRules)
    co.add('classic')
    co.add('classic')
    co.add('classic')
    co.add('premium')

    expect(co.getTotal()).toBe(934.97)
})

/*
    Customer: Apple
    SKUs Scanned: `standout`, `standout`, `standout`, `premium`
    Total expected: $1294.96
*/
it('expect total 1294.96 for customer Apple', () => {

    // create the pricing rule for apple
    const pricingRules = {
        customerName: 'apple',
        priceList,
        customerRule: {
            classic: 'full',
            standout: '*299.99',
            premium: 'full'
        }
    }

    const co = new Checkout(pricingRules)
    co.add('standout')
    co.add('standout')
    co.add('standout')
    co.add('premium')

    expect(co.getTotal()).toBe(1294.96)
})

/*
    Customer: Nike
    SKUs Scanned: `premium`, `premium`, `premium`, `premium`
    Total expected: $1519.96
*/
it('expect total 1519.96 for customer Nike', () => {

    // create the pricing rule for nike
    const pricingRules = {
        customerName: 'nike',
        priceList,
        customerRule: {
            classic: 'full',
            standout: 'full',
            premium: '4>379.99'  // 4 or more for 379.99
        }
    }

    const co = new Checkout(pricingRules)
    co.add('premium')
    co.add('premium')
    co.add('premium')
    co.add('premium')

    expect(co.getTotal()).toBe(1519.96)
})

/*
    Customer: Ford
    SKUs Scanned: `5 x classic`, `standout`, ` 4 x premium`
    Total expected: $2949.91
*/
it('expect total 2949.91 for customer Ford', () => {

    // create the pricing rule for unilever
    const pricingRules = {
        customerName: 'ford',
        priceList,
        customerRule: {
            classic: '5@', // 5 for 4
            standout: '*309.99', // 309.99
            premium: '3>389.99' // 3 or more for 389.99
        }
    }

    const co = new Checkout(pricingRules)
    co.add('classic')
    co.add('classic')
    co.add('classic')
    co.add('classic')
    co.add('classic') // 4 * 269.99 = 1079.96
    co.add('standout') // 1 * 309.99 + 1079.96 = 1389.95
    co.add('premium')
    co.add('premium')
    co.add('premium')
    co.add('premium') // 4 * 389.99 = 1559.96 + 1389.95 = 2949.91

    expect(co.getTotal()).toBe(2949.91)
})
