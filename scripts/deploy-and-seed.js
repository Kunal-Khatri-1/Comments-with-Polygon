// const hre = require("hardhat")
const { ethers } = require("hardhat")

const main = async () => {
  // const Comment = await ethers.getContract("Comments")
  // const tx1 = await Comment.addComment("my-blog-post", "my first comment")
  // await tx1.wait()
  // const tx2 = await Comment.addComment("second post", "my second comment")
  // await tx2.wait()
  // console.log("------------------------------------------")
  // const firstResponse = await Comment.getComments("my-blog-post")
  // console.log(firstResponse)
  // const secondResponse = await Comment.getComments("second post")
  // console.log(secondResponse)
  console.log("--------------------------------")
  const CommentsContractFactory = await ethers.getContractFactory("Comments")
  const CommentsContract = await CommentsContractFactory.deploy()
  await CommentsContract.deployed()
  console.log(`Contract deployed to: ${CommentsContract.address}`)

  console.log(`adding first comment...`)
  const tx1 = await CommentsContract.addComment(
    "my-blog-post",
    "My first comment"
  )
  await tx1.wait()
  console.log("first comment added...")

  console.log("adding second comment...")
  const tx2 = await CommentsContract.addComment(
    "my-blog-post",
    "My second comment"
  )
  await tx2.wait()
  console.log("second comment added...")

  console.log("----------------------------------")
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
