import React, { useState, useTransition } from "react"
import { graphql, useRefetchableFragment } from "react-relay"
import { useDebouncedCallback } from "use-debounce"
import type { ItemsFragment$key } from "./__generated__/ItemsFragment.graphql"
import Item from "./item"

const itemsFragment = graphql`
  fragment ItemsFragment on Query
  @refetchable(queryName: "ItemsRefetchQuery")
  @argumentDefinitions(
    first: { type: Int, defaultValue: 5 },
    after: { type: Cursor },
    before: { type: Cursor },
    last: { type: Int }
  )
  {
    allItems(first: $first, after: $after, before: $before, last: $last) {
      edges {
        node {
          id
          ...ItemFragment
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`

const Items = ({ itemsRef }: { itemsRef: ItemsFragment$key }): React.ReactNode => {
  const [pageSize] = useState(5)
  const [queryRes, refetch] = useRefetchableFragment(itemsFragment, itemsRef)
  const [pagingDirection, setPagingDirection] = useState<"FORWARD" | "BACKWARD">("FORWARD")
  const [hasPagedAlready, setHasPagedAlready] = useState(false)
  const [isPending, startTransition] = useTransition()

  const itemNodes = queryRes.allItems?.edges.map(edge => edge?.node)

  const canNextPage = pagingDirection === "FORWARD"
    ? queryRes.allItems?.pageInfo.hasNextPage ?? false
    : true

  const canPreviousPage = hasPagedAlready
    ? (pagingDirection === "BACKWARD"
        ? queryRes.allItems?.pageInfo.hasPreviousPage ?? false
        : true)
    : false

  const gotoPrevPage = () => {
    startTransition(() => {
      refetch({
        before: queryRes.allItems?.pageInfo.startCursor,
        last: pageSize,
        first: null,
        after: null,
      }, { fetchPolicy: "network-only" })
      setHasPagedAlready(true)
      setPagingDirection("BACKWARD")
    })
  }

  const gotoNextPage = () => {
    startTransition(() => {
      refetch({
        after: queryRes.allItems?.pageInfo.endCursor,
        first: pageSize,
        before: null,
        last: null,
      })
      setHasPagedAlready(true)
      setPagingDirection("FORWARD")
    })
  }

  const handleSearch = useDebouncedCallback((search: string) => {
    startTransition(() => {
      refetch({ search: search, first: 10, after: null })
    })
  }, 300)

  return (
    <div>
      <h1>Items</h1>
      <div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
          disabled={!canPreviousPage || isPending}
          onClick={gotoPrevPage}
        >
          Previous
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
          disabled={!canNextPage || isPending}
          onClick={gotoNextPage}
        >
          Next
        </button>
      </div>
      {itemNodes && itemNodes.map(item => item && (
        <Item key={item.id} item={item} />
      ))}
    </div>
  )
}

export default Items
