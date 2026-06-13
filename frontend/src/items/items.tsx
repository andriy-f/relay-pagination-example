import React, { useState, useTransition } from "react"
import { graphql, useRefetchableFragment } from "react-relay"
import { useDebouncedCallback } from "use-debounce"
import type { ItemsFragment$key } from "./__generated__/ItemsFragment.graphql"
import Item from "./item"

const itemsFragment = graphql`
  fragment ItemsFragment on Query
  @refetchable(queryName: "ItemsRefetchQuery")
  @argumentDefinitions(
    search: { type: String },
    first: { type: Int, defaultValue: 5 },
    after: { type: Cursor }
  )
  {
    searchItems(search: $search, first: $first, after: $after) {
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
  const [searchTerm, setSearchTerm] = useState("")
  const [isPending, startTransition] = useTransition()

  const itemNodes = queryRes.searchItems?.edges.map(edge => edge?.node)

  const canNextPage = pagingDirection === "FORWARD"
    ? queryRes.searchItems?.pageInfo.hasNextPage ?? false
    : true

  const canPreviousPage = hasPagedAlready
    ? (pagingDirection === "BACKWARD"
        ? queryRes.searchItems?.pageInfo.hasPreviousPage ?? false
        : true)
    : false

  const gotoPrevPage = () => {
    startTransition(() => {
      refetch({
        before: queryRes.searchItems?.pageInfo.startCursor,
        last: pageSize,
        first: null,
        after: null,
      })
      setHasPagedAlready(true)
      setPagingDirection("BACKWARD")
    })
  }

  const gotoNextPage = () => {
    startTransition(() => {
      refetch({
        after: queryRes.searchItems?.pageInfo.endCursor,
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
      <input
        className="border-2 border-gray-300 rounded-md p-2 mb-4 w-full"
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value)
          handleSearch(e.target.value)
        }}
        placeholder="Search items..."
      />
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
