// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./token/ABaseNFT.sol";

contract SimpleNFT is ABaseNFT {
    constructor(string memory name_, string memory symbol_) ABaseNFT(name_, symbol_) {}

    function mintTo(
        address receiver_,
        uint256 tokenId_,
        string calldata tokenURI_
    ) external override onlyOwner {
        _mint(receiver_, tokenId_);
        _setTokenURI(tokenId_, tokenURI_);
    }

    function getUserTokens(address user_) external view returns (uint256[] memory) {
        uint256 balance = balanceOf(user_);
        uint256[] memory tokens = new uint256[](balance);

        for (uint256 i = 0; i < balance; i++) {
            tokens[i] = tokenOfOwnerByIndex(user_, i);
        }

        return tokens;
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ABaseNFT) {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);

        // TODO: additional task
    }
}
