// ToDo
describe('HelloTransaction', function () {
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

        it('should implement tests', function () {});
    });
});
