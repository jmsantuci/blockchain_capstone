const TestConfig = require('./TestConfig.js');
const truffleAssert = require('truffle-assertions');

contract('TestERC721Mintable', accounts => {

    let testConfig;

    describe('match erc721 specification', function () {
        beforeEach(async function () {
            testConfig = await TestConfig.TestConfig(accounts);

            for (let i = testConfig.firstAccountIndex; i <= testConfig.lastAccountIndex; i++) {
                await testConfig.customERC721Token.mint(accounts[i], i, {from: testConfig.owner});
            }
        })

        it('should return total supply', async function () {
            const totalSupply = await testConfig.customERC721Token.totalSupply();
            assert.equal(totalSupply, 10, "Invalid total number of Supplies");
        })

        it('should get token balance', async function () {
            const tokenBalance = await testConfig.customERC721Token.balanceOf(testConfig.firstAccount);
            assert.equal(tokenBalance, 1, "Invalid balance of first account");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            const tokenURI = await testConfig.customERC721Token.tokenURI(1); // First token
            assert.equal(tokenURI, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1", "Invalid token URI string format")
        })

        it('should transfer token from one owner to another', async function () {
            await testConfig.customERC721Token.safeTransferFrom(testConfig.firstAccount, testConfig.cleanAccount, 1, {from: testConfig.firstAccount});
            const balance = await testConfig.customERC721Token.balanceOf(testConfig.cleanAccount);
            assert.equal(balance, 1, "Error on transfering token")
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () {
            testConfig = await TestConfig.TestConfig(accounts);
            this.contract = testConfig.customERC721Token;
        })

        it('should fail when minting when address is not contract owner', async function () { 
            await truffleAssert.reverts(testConfig.customERC721Token.mint(testConfig.firstAccount, 1, {from: testConfig.cleanAccount}));
        })

        it('should return contract owner', async function () {
            assert.equal(await testConfig.customERC721Token.owner.call(), testConfig.owner, "Invalid contract owner");
        })

    });
})