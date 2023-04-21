const simpleNFT = artifacts.require("SimpleNFT");

module.exports = async (deployer) => {
  await deployer.deploy(simpleNFT, "SimpleNFT", "SBT");
};
