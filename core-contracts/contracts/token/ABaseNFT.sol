// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@dlsl/dev-modules/libs/arrays/Paginator.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

import "../interface/ISimpleNFT.sol";

abstract contract ABaseNFT is ISimpleNFT, Ownable, ERC721Enumerable, ERC721URIStorage {
    constructor(string memory name, string memory symbol) ERC721(name, symbol) {}

    function burnFrom(address payer, uint256 tokenId) external override {
        require(
            ownerOf(tokenId) == payer &&
                (payer == msg.sender ||
                    (getApproved(tokenId) == msg.sender || isApprovedForAll(payer, msg.sender))),
            "SimpleNFT: not approved"
        );

        _burn(tokenId);
    }

    function setTokenURI(uint256 tokenId, string calldata tokenURI_) external override onlyOwner {
        _setTokenURI(tokenId, tokenURI_);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721URIStorage, ERC721) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function getTokensURIs(
        uint256[] calldata tokenIds
    ) external view override returns (string[] memory) {
        string[] memory uris = new string[](tokenIds.length);

        for (uint256 i = 0; i < tokenIds.length; i++) {
            uris[i] = tokenURI(tokenIds[i]);
        }

        return uris;
    }

    function getTokenInfo(
        uint256 tokenId
    ) external view override returns (ISimpleNFT.TokenInfo memory) {
        return ISimpleNFT.TokenInfo(tokenId, tokenURI(tokenId), ownerOf(tokenId));
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721Enumerable, ERC721, IERC165) returns (bool) {
        return interfaceId == type(ISimpleNFT).interfaceId || super.supportsInterface(interfaceId);
    }

    function _burn(uint256 tokenId) internal override(ERC721URIStorage, ERC721) {
        super._burn(tokenId);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal virtual override(ERC721Enumerable, ERC721) {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }
}
