import React from "react"
import { graphql, useRefetchableFragment } from "react-relay"
import type { ItemsFragment$key } from "./__generated__/ItemsFragment.graphql"
import Item from "./item"

const itemsFragment = graphql`
  fragment ItemsFragment on Query
  @refetchable(queryName: "ItemsRefetchQuery")
  @argumentDefinitions(
    search: { type: String },
    first: { type: Int, defaultValue: 10 },
    offset: { type: Int, defaultValue: 0 }
  )
  {
    searchItems(search: $search, first: $first, offset: $offset) {
      edges {
        node {
          id
          ...ItemFragment
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`

const Items = ({ itemsRef }: { itemsRef: ItemsFragment$key }): React.ReactNode => {
  const [queryRes, refetch] = useRefetchableFragment(itemsFragment, itemsRef)
  const itemNodes = queryRes.searchItems?.edges.map(edge => edge?.node)
  return (
    <div>
      <h1>Items</h1>
      {itemNodes && itemNodes.map(item => item && (
        <Item key={item.id} item={item} />
      ))}
    </div>
  )
}

export default Items
