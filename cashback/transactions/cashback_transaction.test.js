const sinon = require('sinon');
const { expect } = require('chai');

const { CashbackTransaction } = require('./cashback_transaction');

describe('CashbackTransaction', function () {
    let validCashbackTx;
    let storeStub;

    describe('apply', function () {
        beforeEach(() => {
            storeStub = {
                account: {
                    get: sinon.stub(),
                    getOrDefault: sinon.stub(),
                    set: sinon.spy(),
                },
            };
        });

        describe('given a valid transfer of 100 from account with 100', () => {
            beforeEach(() => {
                validCashbackTx = new CashbackTransaction({
                    senderId: '16313739661670634666L',
                    senderPublicKey:
                        'c094ebee7ec0c50ebee32918655e089f6e1a604b83bcaa760293c61e0f18ab6f',
                    asset: {
                        recipientId: '1L',
                        amount: '100',
                    },
                });

                storeStub.account.get.returns({
                    address: '16313739661670634666L',
                    balance: '100',
                });
            });
            describe('when applyAsset of balance transfer fails', () => {
                beforeEach(() => {
                    sinon
                        .stub(validCashbackTx.__proto__.__proto__, 'applyAsset')
                        .returns([new Error('Balance Transfer Error')]);
                });

                afterEach(() => {
                    sinon.restore();
                });

                it('should return errors', function () {
                    expect(
                        validCashbackTx.applyAsset(storeStub)
                    ).to.have.lengthOf(1);
                });

                it('should not commit any changes to storage', function () {
                    expect(storeStub.account.set.called).to.be.false;
                });
            });

            describe('when applyAsset of balance transfer succeeds', () => {
                beforeEach(() => {
                    sinon
                        .stub(validCashbackTx.__proto__.__proto__, 'applyAsset')
                        .returns([]);
                    // When a regular transfer succeeds the senders balance should be 0 (100 acc balance - 100 tx amount, assuming FEE = 0)
                    storeStub.account.get.returns({
                        address: '16313739661670634666L',
                        balance: '0',
                    });
                });

                afterEach(() => {
                    sinon.restore();
                });

                it('should not return errors', function () {
                    expect(validCashbackTx.applyAsset(storeStub)).to.be.empty;
                });

                it('should commit changes to storage', function () {
                    validCashbackTx.applyAsset(storeStub);
                    expect(storeStub.account.set.called).to.be.true;
                });

                it("should add the 10% cashback to sender's account", function () {
                    validCashbackTx.applyAsset(storeStub);
                    expect(storeStub.account.set.firstCall.lastArg).eql({
                        address: '16313739661670634666L',
                        balance: '10',
                    });
                });
            });
        });
    });
});
