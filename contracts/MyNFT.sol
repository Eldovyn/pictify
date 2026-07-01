// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {
    ERC721Burnable
} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import {
    ERC721URIStorage
} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MyNFT is ERC721, ERC721URIStorage, ERC721Burnable, Ownable {
    uint256 private _nextTokenId;

    struct NFTMetadata {
        address creator;
        uint256 timestamp;
    }

    mapping(uint256 => NFTMetadata) public nftDetails;

    constructor(
        address initialOwner
    ) ERC721("MyNFT", "MNFT") Ownable(initialOwner) {}

    function mintMyNFT(string memory tokenURI) public returns (uint256) {
        uint256 newItemId = _nextTokenId++;

        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);

        nftDetails[newItemId] = NFTMetadata({
            creator: msg.sender,
            timestamp: block.timestamp
        });

        return newItemId;
    }

    function getNFTDetails(
        uint256 tokenId
    ) public view returns (address creator, uint256 timestamp) {
        NFTMetadata memory data = nftDetails[tokenId];
        return (data.creator, data.timestamp);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
