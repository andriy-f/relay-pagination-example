import React from "react"
import ItemsSearch from "~/items/ItemsSearch"
import { graphql, useLazyLoadQuery } from "react-relay"
import type { ItemsSearchRouteQuery } from "./__generated__/ItemsSearchRouteQuery.graphql"

const pageQuery = graphql`
query ItemsSearchRouteQuery {
  ...ItemsSearchFragment
}
`

const ItemsSearchRoute = () => {
  const queryRes = useLazyLoadQuery<ItemsSearchRouteQuery>(pageQuery, {})
  return (
    <div>
      <ItemsSearch itemsRef={queryRes} />
    </div>
  )
}

export default ItemsSearchRoute
