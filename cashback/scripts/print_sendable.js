const { CashbackTransaction } = require('../transactions/cashback_transaction');

/**
 *  To send printed transaction:
 *  > node src/transactions/create_trs.js | curl -X POST -H "Content-Type: application/json" -d @- localhost:4000/api/transactions
 *  Note: An application needs to run on port 4000 (the default one) before.
 */
const c = new CashbackTransaction({
    asset: {
        amount: `${10 ** 8}`,
        recipientId: '10881167371402274308L', //delegate genesis_100
    },
    networkIdentifier:
        '9ee11e9df416b18bf69dbd1a920442e08c6ca319e69926bc843a561782ca17ee', // that's mainnet
});

c.sign(
    'wagon stock borrow episode laundry kitten salute link globe zero feed marble'
);

console.log(c.stringify());
