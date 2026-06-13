import React from "react"
import Items from "~/items/items"
import { graphql, useLazyLoadQuery } from "react-relay"
import type { ItemsRouteQuery } from "./__generated__/ItemsRouteQuery.graphql"

const pageQuery = graphql`
query ItemsRouteQuery {
  ...ItemsFragment
}
`

const ItemsRoute = () => {
  const queryRes = useLazyLoadQuery<ItemsRouteQuery>(pageQuery, {})
  return (
    <div>
      <Items itemsRef={queryRes} />
    </div>
  )
}

export default ItemsRoute
