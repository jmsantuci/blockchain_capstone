# Udacity blockchain Capstone project
blockchain_capstone

# Instructions

## To run unit test

1. Download or clone de repo
2. Instal node dependencies
```bash
$ npm install
```
3. Compile the contracts
```bash
$ cd eth-contracts
$ truffle compile
```
4. Start Ganache
```bash
$ ganache-cli
```
5. Run tests using truffle
```bash
$ cd eth-contracts
$ truffle test/TestERC721Mintable.js test/TestSquareVerifier.js test/TestSolnSquareVerifier.js
```

## To deploy in Rinkeby

1. Create a file called .secret in eth-contracts directory
```bash
$ cd eth-contracts
$ touch .secret
```
2. Fill .secret file with your Ribery account mnemonic
```bash
$ echo '<your mnemonic>' > .secret
```
3. Deploy to Rinkeby
```bash
$ truffle migrate --network rinkeby --dry-run
```
## To mint tokens

1. Go to eth-contracts
```bash
$ cd eth-contracts
```
2. Run the following command
```bash
$ node scripts/mint.js '<your contract address>' '<your owner account>' '<your target account>'
```
## Rinkeby contract and accounts

Contract address: 0x4BcB67b9344eC1424c6b13252B4f467F62A83db6

Account Owner: 0xE232f283e99De556E5c490453D65125a4032091c

Account Buyer: 0xf05a159a7A3a9BB4FA380b2F431F15c682445E36

## OpenSea

The following Houses (tokens) were sold from Owner account to Buyer account:

1. [Cozy family home](https://rinkeby.opensea.io/assets/0x4bcb67b9344ec1424c6b13252b4f467f62a83db6/1)
2. [Luxury Home](https://rinkeby.opensea.io/assets/0x4bcb67b9344ec1424c6b13252b4f467f62a83db6/2)
3. [Manufacturing Warehouse](https://rinkeby.opensea.io/assets/0x4bcb67b9344ec1424c6b13252b4f467f62a83db6/3)
4. [Small Condo](https://rinkeby.opensea.io/assets/0x4bcb67b9344ec1424c6b13252b4f467f62a83db6/4)
5. [Floating House](https://rinkeby.opensea.io/assets/0x4bcb67b9344ec1424c6b13252b4f467f62a83db6/5)

**I minted more 5 tokens, so OpenSea is showing 10 tokens.**