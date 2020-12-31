const Implementation = artifacts.require("Implementation");
const Deployer1 = artifacts.require("Deployer1");
const Deployer2 = artifacts.require("Deployer2");
const Deployer3 = artifacts.require("Deployer3");
const Root = artifacts.require("Root");

async function deployImplementation(deployer) {
  await deployer.deploy(Implementation);
}

module.exports = function(deployer) {
  deployer.then(async() => {
    console.log(deployer.network);
    switch (deployer.network) {
      case 'development':
      case 'rinkeby':
      case 'ropsten':
        await deployer.deploy(Implementation);
        await deployer.deploy(Deployer1);
        await deployer.deploy(Deployer2);
        await deployer.deploy(Deployer3);
        await deployer.deploy(Root, Deployer1.address);
        break;
      case 'mainnet':
      case 'mainnet-fork':
        await deployImplementation(deployer);
        break;
      default:
        throw("Unsupported network");
    }
  })
};