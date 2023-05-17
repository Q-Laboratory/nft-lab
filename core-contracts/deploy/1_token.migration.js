const SimpleNFT = artifacts.require("SimpleNFT");

module.exports = async (deployer) => {
  await deployer.deploy(SimpleNFT, "Simple NFT", "ST");
};
