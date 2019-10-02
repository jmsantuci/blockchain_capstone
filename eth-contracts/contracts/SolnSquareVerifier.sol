pragma solidity >=0.4.21 <0.6.0;

import "./ERC721Mintable.sol";
import "./Verifier.sol";

contract SolnSquareVerifier is CustomERC721Token, Verifier {

    struct Solution {
        address solutionAddress;
        bool exist;
        uint8 exist8;
    }

    mapping(bytes32 => Solution) solutions;
    mapping(address => Solution) submitedSolutions;

    event SolutionAdded(address solutionAddress);

    constructor(string memory name, string memory symbol)
        CustomERC721Token(name, symbol) public {
    }

    function addSolution(uint256[2] memory a, uint256[2][2] memory b, uint256[2] memory c, uint256[2] memory input) public {
        // Check solution uniqueness
        bytes32 solutionHash = createSolutionHash(a, b, c, input);
        require(solutions[solutionHash].exist == false, "Solution already exists");

        // Checks solution using Zokrates
        bool solutionOk = verifyTx(a, b, c, input);
        require(solutionOk, "Solution is invalid");

        // Add solution
        Solution memory newSolution = Solution(msg.sender, true, 1);
        solutions[solutionHash] = newSolution;
        submitedSolutions[msg.sender] = newSolution;

        // Emit event
        emit SolutionAdded(msg.sender);
    }

    function mint(address to, uint256 tokenId) public {
        Solution memory solution = submitedSolutions[to];
        require(solution.exist, "Solution doesn't exist");
        super.mint(to, tokenId);
    }

    function createSolutionHash(uint256[2] memory a, uint256[2][2] memory b, uint256[2] memory c, uint256[2] memory input)
            internal pure returns (bytes32) {
        bytes32 solutionHash = keccak256(abi.encodePacked(a, b, c, input));
        return solutionHash;
    }
}



