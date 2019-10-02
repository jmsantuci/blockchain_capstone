const TestConfig = require('./TestConfig.js');

contract('Verifier', accounts => {
    let testConfig;

    describe('Test Zokrates code generation', function () {
        beforeEach(async function () {
            testConfig = await TestConfig.TestConfig(accounts);
        });

        it('should proof validation returns true', async function () {
            const verified = await testConfig.verifier.verifyTx.call(
                testConfig.corretProof.proof.a,
                testConfig.corretProof.proof.b,
                testConfig.corretProof.proof.c,
                testConfig.corretProof.inputs);
            assert.ok(verified, "Proof verification failed");
        });

        it('should proof validation returns false', async function () {
            const result = await testConfig.verifier.verifyTx.call(
                testConfig.incorretProof.proof.a,
                testConfig.incorretProof.proof.b,
                testConfig.incorretProof.proof.c,
                testConfig.incorretProof.inputs);
            console.log("result: " + result);
            assert.equal(result, false, "Proof verification ok");
        });

    });
});
