import type { NextPage } from "next"
import * as React from "react"
import { QueryClient, QueryClientProvider, QueryCache } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import { ChakraProvider, Box, Heading } from "@chakra-ui/react"
import { Toaster, toast } from "react-hot-toast"
import theme from "../theme"
import { Provider as WagmiProvider } from "wagmi"
import { ethers } from "ethers"
import Comments from "../components/Comments"

// Provider that will be used when no wallet is connected
// const provider = ethers.providers.getDefaultProvider("http://localhost:8545")
const provider = ethers.providers.getDefaultProvider(
  "https://polygon-mumbai.g.alchemy.com/v2/O7FPdKbGR0Ah_iNFJGW4ZVz20nCA8piZ"
)

// Creating a react-query client
// QueryClient can be used to interact with a cache:
const queryClient = new QueryClient({
  // Optional
  defaultOptions: {
    queries: {
      // do a refetch when window is refocused, true by default
      refetchOnWindowFocus: false,
    },
  },
  // QueryCache => the storage mechanism for React Query. It stores all the data, meta information and state of queries it contains.
  // queryCache => The query cache this client is connected to.
  // Optional
  queryCache: new QueryCache({
    onError: () => {
      toast.error("Network Error: Ensure you are on the correct network")
    },
  }),
})

const App: NextPage = () => {
  return (
    <WagmiProvider autoConnect provider={provider}>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Box p={8} maxW="600px" minW="320px" m="0 auto">
            {/* <Heading>Oops!, no comments yet</Heading> */}
            <Comments topic="my-blog-post" />
            <Toaster position="bottom-left"></Toaster>
          </Box>
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </QueryClientProvider>
      </ChakraProvider>
    </WagmiProvider>
  )
}

export default App
