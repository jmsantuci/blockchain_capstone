const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require("web3");
const fs = require('fs');

function loadSecretFile(fileName) {
    var mnemonic = null;
    if (fs.existsSync(fileName)) {
        mnemonic = fs.readFileSync(fileName).toString().trim();
    } else {
        console.log("File doesn't exist" + fileName);
    }

    return mnemonic;
}

function loadProof(fileName) {
    const proofFile = fs.readFileSync(fileName);
    const proof = JSON.parse(proofFile);
    return proof;
}

function loadJSONContract(fileName) {
    const contractFile = fs.readFileSync(fileName);
    const jsonContract = JSON.parse(contractFile);
    return jsonContract;
}

async function addSolution(contract, ownerAccount, index) {
    const proof = loadProof(`./scripts/data/proof-${index}.json`);
    
    try {
        await contract.methods.addSolution(proof.proof.a, proof.proof.b, proof.proof.c, proof.inputs).send( {from: ownerAccount, gas: 4700000, gasPrice: 8000000000} );
        console.log('Solution added')
    } catch (error) {
        console.log('Failed to add solution. ' + error);
        throw error;
    }
}

async function getNextTokenId(contract) {
    let totalSupply;
    try {
        totalSupply = await contract.methods.totalSupply().call();
    } catch (error) {
        console.log('Failed to get total supply. ' + error);
        throw error;
    }

    const tokenId = parseInt(totalSupply) + 1;
    return tokenId;
}

async function mint(contract, ownerAccount, targetAccount, tokenId) {
    try{
        await contract.methods.mint(targetAccount, tokenId).send({from: ownerAccount, gas: 4700000, gasPrice: 8000000000});
        console.log('Token minted');
    } catch (error) {
        console.log('Failed to mint the token. ' + error);
        throw error;
    }
}

const main = async() => {
    const programArguments = process.argv.slice(2);
    const contractAddress = programArguments[0];
    const ownerAccount = programArguments[1];
    const targetAccount = programArguments[2];

    console.log('Contract address: ' + contractAddress);
    console.log('Owner address: ' + ownerAccount);
    console.log('Target address: ' + targetAccount);

    var mnemonic = loadSecretFile( './.secret');

    console.log('Connecting to Rinkeby...');
    
    const web3 = new Web3(new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io/v3/2bce7c5f9bb24a6f8a9407f0609af9f4'));
    console.log('Connected to Rinkeby.');

    console.log('Loading contract...');
    const jsonInterface = loadJSONContract('./build/contracts/SolnSquareVerifier.json');
    const contract = new web3.eth.Contract(jsonInterface.abi, contractAddress);
    console.log('Contract loaded');
    
    for (index = 1; index < 11; index++) {
        try {
            await addSolution(contract, ownerAccount, index);
            
            const tokenId = await getNextTokenId(contract);
            console.log('New token id: ' + tokenId);

            await mint(contract, ownerAccount, targetAccount, tokenId);
        } catch (error) {
            console.log(`Error on minting. Index: ${index}. Error message:  ${error.message}`);
        }
    }

    process.exit();

}

main();