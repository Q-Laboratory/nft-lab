// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol";

interface ISimpleNFT is IERC721Enumerable {
    struct TokenInfo {
        uint256 tokenId;
        string tokenURI;
        address owner;
    }

    function mintTo(address receiver, uint256 tokenId, string calldata tokenURI) external;

    function burnFrom(address payer, uint256 tokenId) external;

    function setTokenURI(uint256 tokenId, string calldata tokenURI) external;

    function getTokensURIs(uint256[] calldata tokenIds) external view returns (string[] memory);

    function getTokenInfo(uint256 tokenId) external view returns (TokenInfo memory);
}
