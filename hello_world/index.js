const { Application, genesisBlockDevnet, configDevnet } = require('lisk-sdk');
const { HelloTransaction } = require('./transactions/hello_transaction');

const app = new Application(genesisBlockDevnet, configDevnet);

app.registerTransaction(HelloTransaction);

app.run()
    .then(() => app.logger.info('App started...'))
    .catch((error) => {
        console.error('Faced error in application', error);
        process.exit(1);
    });
