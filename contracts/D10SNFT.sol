pragma solidity ^0.8.3;

import "@openzeppelin/contracts/utils/Counters.sol"; //increment a tokenId for each new token.
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol"; // handle our tokenURI, which contains metadata and image.
import "@openzeppelin/contracts/token/ERC721/ERC721.sol"; //basic functions of the ERC721;

contract D10SNFT is ERC721URIStorage { 

    using Counters for Counters.Counter; 
    Counters.Counter private _tokenIds;

    constructor() ERC721("D10S NFT", "D10S") {
    }

    function createToken(string memory tokenURI) public returns (uint) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
}