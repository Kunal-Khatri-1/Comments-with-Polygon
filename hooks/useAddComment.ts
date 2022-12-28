// import { useMutation } from "react-query"
// import useCommentsContract from "./useCommentsContract"

// interface UseAddCommentPayload {
//   topic: string
//   message: string
// }

// const useAddComment = () => {
//   const contract = useCommentsContract()
//   // Mutations are intended for async actions that mutate data such as inserts, updates, and deletes
//   //   queries are intended for read-only async actions.
//   return useMutation(async ({ topic, message }: UseAddCommentPayload) => {
//     await contract.addComment(topic, message)
//   })
// }

// export default useAddComment

import { useMutation } from "react-query"
import useCommentsContract from "./useCommentsContract"

interface UseAddCommentPayload {
  topic: string
  message: string
}

const useAddComment = () => {
  const contract = useCommentsContract()

  return useMutation(async ({ topic, message }: UseAddCommentPayload) => {
    await contract.addComment(topic, message)
  })
}

export default useAddComment
