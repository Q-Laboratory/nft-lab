// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol";

interface ISimpleNFT is IERC721Enumerable {
    struct TokenInfo {
        uint256 tokenId;
        string tokenURI;
        address owner;
    }

    function mintTo(address receiver_, uint256 tokenId_, string calldata tokenURI_) external;

    function burnFrom(address payer_, uint256 tokenId_) external;

    function setTokenURI(uint256 tokenId_, string calldata tokenURI_) external;

    function getTokensURIs(uint256[] calldata tokenIds_) external view returns (string[] memory);

    function getTokenInfo(uint256 tokenId_) external view returns (TokenInfo memory);
}
