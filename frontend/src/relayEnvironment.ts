import { Environment, Network, type FetchFunction } from "relay-runtime"

const HTTP_ENDPOINT = "http://localhost:3002/graphql"

const fetchGraphQL: FetchFunction = async (request, variables) => {
  const resp = await fetch(HTTP_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: request.text, variables }),
  })
  if (!resp.ok) {
    throw new Error("Relay GraphQL Response failed.")
  }
  return await resp.json()
}

const environment = new Environment({
  network: Network.create(fetchGraphQL),
})

export default environment
