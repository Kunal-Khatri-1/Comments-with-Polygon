import { useQuery } from "react-query"
import useCommentsContract from "./useCommentsContract"

interface UseCommentsQueryInterface {
  topic: string
}

// This hook will automatically fetch comments for a given topic when rendered and also will refetch comments whenever the topic or the chainId change.

// desctructuring topic out of object of type UseCommentsQueryInterface
const useComments = ({ topic }: UseCommentsQueryInterface) => {
  const contract = useCommentsContract()

  // first arguement => "'comments', { topic, chainId: contract.chainId }" => query key
  // The query key is serialized by react-query and used to maintain a global cache of fetched data.
  return useQuery(["comments", { topic, chainId: contract.chainId }], () =>
    contract.getComments(topic)
  )
}

export default useComments
