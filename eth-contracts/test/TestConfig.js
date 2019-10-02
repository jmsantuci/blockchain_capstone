const CustomERC721Token = artifacts.require("CustomERC721Token");
const Verifier = artifacts.require("Verifier");
const SolnSquareVerifier = artifacts.require("SolnSquareVerifier");
const fs = require("fs");

function loadProof(fileName) {
    const proofFile = fs.readFileSync(fileName);
    const proof = JSON.parse(proofFile);
    return proof;
}

var TestConfig = async function(accounts) {

    const owner = accounts[0];
    const tokenName = "JMS-TestToken";
    const tokenSymbol = "JMSTSTTK";
    const firstAccountIndex = 1;
    const lastAccountIndex = 10;

    const customERC721Token = await CustomERC721Token.new(tokenName, tokenSymbol, {from: owner});
    const verifier = await Verifier.new();
    const solnSquareVerifier = await SolnSquareVerifier.new(tokenName, tokenSymbol, {from: owner});

    const corretProof = loadProof("./test/correct-proof.json");
    const incorretProof = loadProof("./test/incorrect-proof.json");

    return {
        tokenName: tokenName,
        tokenSymbol: tokenSymbol,
        owner: owner,
        firstAccountIndex: firstAccountIndex,
        lastAccountIndex: lastAccountIndex,
        firstAccount: accounts[firstAccountIndex],
        cleanAccount: accounts[lastAccountIndex + 1],
        customERC721Token: customERC721Token,
        verifier: verifier,
        solnSquareVerifier: solnSquareVerifier,
        corretProof: corretProof,
        incorretProof: incorretProof
    }
}

module.exports = {
    TestConfig: TestConfig
};