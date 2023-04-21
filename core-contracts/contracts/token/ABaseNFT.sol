// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@dlsl/dev-modules/libs/arrays/Paginator.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

import "../interface/ISimpleNFT.sol";

abstract contract ABaseNFT is ISimpleNFT, Ownable, ERC721Enumerable, ERC721URIStorage {
    constructor(string memory name_, string memory symbol_) ERC721(name_, symbol_) {}

    function burnFrom(address payer_, uint256 tokenId_) external override {
        require(
            ownerOf(tokenId_) == payer_ &&
                (payer_ == msg.sender ||
                    (getApproved(tokenId_) == msg.sender || isApprovedForAll(payer_, msg.sender))),
            "SimpleNFT: not approved"
        );

        _burn(tokenId_);
    }

    function setTokenURI(uint256 tokenId_, string calldata tokenURI_) external override onlyOwner {
        _setTokenURI(tokenId_, tokenURI_);
    }

    function tokenURI(
        uint256 tokenId_
    ) public view override(ERC721URIStorage, ERC721) returns (string memory) {
        return super.tokenURI(tokenId_);
    }

    function getTokensURIs(
        uint256[] calldata tokenIds_
    ) external view override returns (string[] memory) {
        string[] memory uris_ = new string[](tokenIds_.length);

        for (uint256 i = 0; i < tokenIds_.length; i++) {
            uris_[i] = tokenURI(tokenIds_[i]);
        }

        return uris_;
    }

    function getTokenInfo(
        uint256 tokenId_
    ) external view override returns (ISimpleNFT.TokenInfo memory) {
        return ISimpleNFT.TokenInfo(tokenId_, tokenURI(tokenId_), ownerOf(tokenId_));
    }

    function supportsInterface(
        bytes4 interfaceId_
    ) public view override(ERC721Enumerable, ERC721, IERC165) returns (bool) {
        return
            interfaceId_ == type(ISimpleNFT).interfaceId || super.supportsInterface(interfaceId_);
    }

    function _burn(uint256 tokenId_) internal override(ERC721URIStorage, ERC721) {
        super._burn(tokenId_);
    }

    function _beforeTokenTransfer(
        address from_,
        address to_,
        uint256 tokenId_,
        uint256 batchSize_
    ) internal virtual override(ERC721Enumerable, ERC721) {
        super._beforeTokenTransfer(from_, to_, tokenId_, batchSize_);
    }
}
