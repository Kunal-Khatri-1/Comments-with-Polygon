// const { network } = require("hardhat")
// const { verify } = require("../utils/verify")
// const { developmentChains } = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()

  // Deploying Comments.sol
  log("--------------------------------------------------")
  const args = []
  const Comments = await deploy("Comments", {
    from: deployer,
    args: args,
    log: true,
    // waitConfirmations: network.config.blockConfirmations || 1,
  })

  log(`Contract deployed at ${Comments.address}`)

  // if (
  //   !developmentChains.includes(network.name) &&
  //   process.env.ETHERSCAN_API_KEY
  // ) {
  //   await verify(Comments.address, args)
  // }
}

module.exports.tags = ["all", "Comments"]
