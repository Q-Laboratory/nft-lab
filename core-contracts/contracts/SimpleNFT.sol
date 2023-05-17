// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./token/ABaseNFT.sol";

contract SimpleNFT is ABaseNFT {
    constructor(string memory name, string memory symbol) ABaseNFT(name, symbol) {}

    function mintTo(
        address receiver,
        uint256 tokenId,
        string calldata tokenURI
    ) external override onlyOwner {
        _mint(receiver, tokenId);
        _setTokenURI(tokenId, tokenURI);
    }

    function getUserTokens(address user) external view returns (uint256[] memory) {
        uint256 balance = balanceOf(user);

        uint256[] memory tokens = new uint256[](balance);

        for (uint256 i = 0; i < balance; i++) {
            tokens[i] = tokenOfOwnerByIndex(user, i);
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

        // TODO: your code goes here

    }
}
