// check for events in the test
// See for the error given by ethers.getContract("Comments")

const { expect } = require("chai")
const { network, getNamedAccounts, deployments, ethers } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("Comments", () => {
      // let deployer, Comments
      let Comments

      beforeEach(async () => {
        // // const { deployer } = await getNamedAccounts()
        // const accounts = await getNamedAccounts()
        // deployer = accounts.deployer
        // await deployments.fixture("all")
        // // Comments = ethers.getContract("Comments", deployer)
        // Comments = await ethers.getContract("Comments")

        const CommentsFactory = await ethers.getContractFactory("Comments")
        Comments = await CommentsFactory.deploy()
        await Comments.deployed()
      })

      it("Should add and fetch successfully", async () => {
        expect(await Comments.getComments("my-blog-post")).to.be.lengthOf(0)

        const tx1 = await Comments.addComment(
          "my-blog-post",
          "my first comment"
        )
        await tx1.wait(1)

        expect(await Comments.getComments("my-blog-post")).to.be.lengthOf(1)
        expect(await Comments.getComments("second-post")).to.be.lengthOf(0)

        const tx2 = await Comments.addComment(
          "second-post",
          "my second comment"
        )
        await tx2.wait()

        expect(await Comments.getComments("my-blog-post")).to.be.lengthOf(1)
        expect(await Comments.getComments("second-post")).to.be.lengthOf(1)
      })
    })
