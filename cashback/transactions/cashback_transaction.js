const { transactions, BigNum } = require('lisk-sdk');

const TransferTransaction = transactions.TransferTransaction;

class CashbackTransaction extends TransferTransaction {
    static get TYPE() {
        return 13;
    }

    static get FEE() {
        return '0';
    }

    applyAsset(store) {
        const transferError = super.applyAsset(store);

        if (transferError.length) {
            return transferError;
        }

        const sender = store.account.get(this.senderId);
        const updatedSenderBalanceAfterBonus = new BigNum(sender.balance).add(
            new BigNum(this.asset.amount).div(10)
        );
        const updatedSender = {
            ...sender,
            balance: updatedSenderBalanceAfterBonus.toString(),
        };
        store.account.set(sender.address, updatedSender);

        return [];
    }

    undoAsset(store) {
        const undoTransferError = super.undoAsset(store);

        if (undoTransferError.length) {
            return undoTransferError;
        }
        const sender = store.account.get(this.senderId);
        const updatedSenderBalanceAfterBonus = new BigNum(sender.balance).sub(
            new BigNum(this.asset.amount).div(10)
        );
        const updatedSender = {
            ...sender,
            balance: updatedSenderBalanceAfterBonus.toString(),
        };
        store.account.set(sender.address, updatedSender);

        return [];
    }
}

module.exports = { CashbackTransaction };
