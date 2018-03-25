const ruleData = [
    {
        customerName: 'Default',
        rule: {
            classic: 'full',
            standout: 'full',
            premium: 'full'
        }
    },
    {
        customerName: 'Unilever',
        rule: {
            classic: '3@',  // 3 for 2
            standout: 'full',
            premium: 'full',
        }
    },
    {
        customerName: 'Apple',
        rule: {
            classic: 'full',
            standout: '*299.99',
            premium: 'full',
        }
    },
    {
        customerName: 'Nike',
        rule: {
            classic: 'full',
            standout: 'full',
            premium: '4>379.99'  // 4 or more for 379.99
        }
    },
    {
        customerName: 'Ford',
        rule: {
            classic: '5@', // 5 for 4
            standout: '*309.99', // 309.99
            premium: '3>389.99' // 3 or more for 389.99
        }
    }
]

export default ruleData
