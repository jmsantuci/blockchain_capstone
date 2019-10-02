const TestConfig = require('./TestConfig.js');
const truffleAssert = require('truffle-assertions');

async function addSolutionHelper(testConfig) {
    let tx = await testConfig.solnSquareVerifier.addSolution(
        testConfig.corretProof.proof.a,
        testConfig.corretProof.proof.b,
        testConfig.corretProof.proof.c,
        testConfig.corretProof.inputs, {from: testConfig.firstAccount});
    return tx;
}
contract('SolnSquareVerifier', accounts => {
    let testConfig;

    describe('Solution Square Verifier Unit Test', function () {
        beforeEach(async function () {
            testConfig = await TestConfig.TestConfig(accounts);
        });

        it('should add a solution without error', async function () {
            let tx = await addSolutionHelper(testConfig);
            truffleAssert.eventEmitted(tx, 'SolutionAdded');
        });

        it("shouldn't add the same solution", async function () {
            let tx = await addSolutionHelper(testConfig);
            truffleAssert.eventEmitted(tx, 'SolutionAdded');
            await truffleAssert.reverts(addSolutionHelper(testConfig));
        });

        it("should mint the token", async function () {
            let tx = await addSolutionHelper(testConfig);
            const beforeTotalSupply = await testConfig.solnSquareVerifier.totalSupply.call();
            const tokenId = beforeTotalSupply + 1;
            await truffleAssert.passes(testConfig.solnSquareVerifier.mint(testConfig.firstAccount, tokenId, {from: testConfig.owner}));
            
            const afterTotalSupply = await testConfig.solnSquareVerifier.totalSupply.call();
            assert.equal(afterTotalSupply - beforeTotalSupply, 1, "Total supply should be increased by one");
        });

        it("should't mint the token for nonexistence", async function () {
            const beforeTotalSupply = await testConfig.solnSquareVerifier.totalSupply.call();
            const tokenId = beforeTotalSupply + 1;
            await truffleAssert.reverts(testConfig.solnSquareVerifier.mint(testConfig.cleanAccount, tokenId, {from: testConfig.owner}));
            
            const afterTotalSupply = await testConfig.solnSquareVerifier.totalSupply.call();
            assert.equal(beforeTotalSupply, beforeTotalSupply, "Total supply should't be increased");
        });
    });
});
