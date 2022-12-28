import * as wagmi from "wagmi"
import { useProvider, useSigner } from "wagmi"
import type { BigNumber } from "ethers"
// getting the ABI of the contract
import CommentsContract from "../artifacts/contracts/Comments.sol/Comments.json"

export interface Comment {
  id: string
  topic: string
  message: string
  creator_address: string
  created_at: BigNumber
}

export enum EventType {
  CommentAdded = "CommentAdded",
}

const useCommentsContract = () => {
  // Singner that connected wallet
  const [signer] = useSigner()
  // provider that will be same as passed as prop to WagmiProvider in index.tsx
  const provider = useProvider()

  // This returns a new ethers.Contract ready to interact with our comments API.
  // We need to pass in the address of our deployed contract as well as its abi.
  // We also pass in the signer if there is a signed in wallet, or if there's
  // no signed in wallet then we'll pass in the connected provider.
  const contract = wagmi.useContract({
    addressOrName: "0xBDf37f4133174E7e779eC461e009Be98554b7564",
    contractInterface: CommentsContract.abi,
    signerOrProvider: signer.data || provider,
  })

  // Wrapper to add types to our getComments function
  const getComments = async (topic: string): Promise<Comment[]> => {
    return contract.getComments(topic).then((comments) => {
      // Each comment is represented as array by default so we convert to object
      const arr = comments.map((c) => ({ ...c }))
      console.log(arr)

      return arr
    })
  }

  // Wrapper to add types to our addComment function
  const addComment = async (topic: string, message: string): Promise<void> => {
    // Create a new transaction
    const tx = await contract.addComment(topic, message)
    // wait for transaction to be mined
    await tx.wait()
  }

  return {
    contract,
    chainId: contract.provider.network?.chainId,
    getComments,
    addComment,
  }
}

export default useCommentsContract
