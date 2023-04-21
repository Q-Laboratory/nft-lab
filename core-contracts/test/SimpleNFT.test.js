const { assert } = require("chai");
const truffleAssert = require("truffle-assertions");

const { castBN } = require("./helpers/caster");
const { accounts } = require("../scripts/utils/utils");

const SimpleNFT = artifacts.require("SimpleNFT");

describe("SimpleNFT", () => {
  let OWNER;
  let FIRST;
  let SECOND;

  let token;

  before(async () => {
    OWNER = await accounts(0);
    FIRST = await accounts(1);
    SECOND = await accounts(2);
  });

  beforeEach("setup", async () => {
    token = await SimpleNFT.new("Simple NFT", "SNFT");
  });

  describe("constructor", () => {
    it("should set parameters correctly", async () => {
      assert.equal(await token.name(), "Simple NFT");
      assert.equal(await token.symbol(), "SNFT");
    });
  });

  describe("SBT", () => {
    it("should not be able to transfer SBT", async () => {
      await token.mintTo(SECOND, 0, "http://i");

      await truffleAssert.reverts(
        token.transferFrom(SECOND, OWNER, 0, { from: SECOND }),
        "SimpleNFT: transfer not allowed"
      );
    });
  });

  describe("mintTo", () => {
    it("should mint correctly only by owner", async () => {
      assert.equal(await token.balanceOf(SECOND), "0");

      await token.mintTo(SECOND, 0, "http://i");

      assert.equal(await token.balanceOf(SECOND), "1");
      assert.equal(await token.tokenURI(0), "http://i");
    });

    it("should revert mint by non-owner", async () => {
      await truffleAssert.reverts(
        token.mintTo(SECOND, 1, "http://i", { from: SECOND }),
        "Ownable: caller is not the owner"
      );
    });
  });

  describe("burnFrom", () => {
    it("should be able to burn tokens", async () => {
      await token.mintTo(SECOND, 1, "1", { from: OWNER });
      await token.burnFrom(SECOND, 1, { from: SECOND });

      assert.equal(await token.balanceOf(SECOND), "0");

      await truffleAssert.reverts(token.tokenURI(1), "ERC721: invalid token ID");
    });

    it("should be able to burn approved token", async () => {
      await token.mintTo(SECOND, 1, "1", { from: OWNER });

      await truffleAssert.reverts(token.burnFrom(SECOND, 1, { from: FIRST }), "SimpleNFT: not approved");

      await token.approve(FIRST, 1, { from: SECOND });

      await token.burnFrom(SECOND, 1, { from: FIRST });

      assert.equal(await token.balanceOf(SECOND), "0");
    });

    it("should be able to burn approvedAll tokens", async () => {
      await token.mintTo(SECOND, 1, "1", { from: OWNER });

      await truffleAssert.reverts(token.burnFrom(SECOND, 1, { from: FIRST }), "SimpleNFT: not approved");

      await token.setApprovalForAll(FIRST, true, { from: SECOND });

      await token.burnFrom(SECOND, 1, { from: FIRST });

      assert.equal(await token.balanceOf(SECOND), "0");
    });

    it("should not burn tokens due to the permissions", async () => {
      await token.mintTo(SECOND, 1, "1", { from: OWNER });

      await truffleAssert.reverts(token.burnFrom(SECOND, 1, { from: FIRST }), "SimpleNFT: not approved");
    });
  });

  describe("setTokenURI", () => {
    it("should set token URI correctly by owner", async () => {
      await token.mintTo(SECOND, 0, "http://i");

      assert.equal(await token.tokenURI(0), "http://i");

      await token.setTokenURI(0, "http://i2");

      assert.equal(await token.tokenURI(0), "http://i2");
    });

    it("should revert set token URI by non-owner", async () => {
      await truffleAssert.reverts(
        token.setTokenURI(0, "http://i2", { from: SECOND }),
        "Ownable: caller is not the owner"
      );
    });
  });

  describe("getters", () => {
    it("should get user tokens", async () => {
      assert.deepEqual(castBN(await token.getUserTokens(SECOND)), []);

      await token.mintTo(SECOND, 0, "http://i");
      assert.deepEqual(castBN(await token.getUserTokens(SECOND)), ["0"]);

      await token.mintTo(SECOND, 2, "http://i2");
      assert.deepEqual(castBN(await token.getUserTokens(SECOND)), ["0", "2"]);
    });

    it("should get token URIs by IDs", async () => {
      await token.mintTo(SECOND, 0, "http://i");
      await token.mintTo(SECOND, 1, "http://i2");
      await token.mintTo(SECOND, 2, "http://i3");

      assert.deepEqual(await token.getTokensURIs([0, 1, 2]), ["http://i", "http://i2", "http://i3"]);
    });

    it("should get Token info by ID", async () => {
      await token.mintTo(SECOND, 1, "http://i2");

      const tokenInfo = await token.getTokenInfo(1);

      assert.equal(tokenInfo.tokenId, "1");
      assert.equal(tokenInfo.tokenURI, "http://i2");
      assert.equal(tokenInfo.owner, SECOND);
    });
  });

  describe("supportsInterface", () => {
    it("should support interfaces", async () => {
      assert.isTrue(await token.supportsInterface("0x42149c7b"));
      assert.isTrue(await token.supportsInterface("0x780e9d63"));
    });
  });
});
