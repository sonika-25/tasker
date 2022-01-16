pragma solidity ^0.8.3;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract NFT is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter public _tokenIds;
  address contractAddress;
  uint256 public listingPrice = 0.025 ether;
  //create an array of all tokenIds: uint256[] public tokenIds;
  constructor(address officeAddress) ERC721("Motify Token", "MTFY") {
      contractAddress = officeAddress;
  }

  function createToken(string memory tokenURI) public returns (uint) {
      _tokenIds.increment();
      uint256 newItemId = _tokenIds.current();
      _mint(contractAddress, newItemId);
      _setTokenURI(newItemId, tokenURI);
      return newItemId;
    }

}
