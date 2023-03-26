const SendFunds = artifacts.require("SendFunds");

module.exports = function(deployer) {
  deployer.deploy(SendFunds);
};
