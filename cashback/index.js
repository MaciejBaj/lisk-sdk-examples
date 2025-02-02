const { Application, genesisBlockDevnet, configDevnet } = require('lisk-sdk');
const { CashbackTransaction } = require('./transactions/cashback_transaction');

const app = new Application(genesisBlockDevnet, configDevnet);

console.log(CashbackTransaction);

app.registerTransaction(CashbackTransaction);

app.run()
    .then(() => app.logger.info('App started...'))
    .catch((error) => {
        console.error('Faced error in application', error);
        process.exit(1);
    });
