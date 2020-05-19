const { HelloTransaction } = require('../transactions/hello_transaction');

/**
 *  To send printed transaction:
 *  > node src/transactions/create_trs.js | curl -X POST -H "Content-Type: application/json" -d @- localhost:4000/api/transactions
 *  Note: An application needs to run on port 4000 (the default one) before.
 */
const h = new HelloTransaction({
    asset: {
        hello: 'world',
    },
    fee: `${10 ** 8}`,
    networkIdentifier:
        '9ee11e9df416b18bf69dbd1a920442e08c6ca319e69926bc843a561782ca17ee', // that's mainnet
});

h.sign(
    'wagon stock borrow episode laundry kitten salute link globe zero feed marble'
);

console.log(h.stringify());
