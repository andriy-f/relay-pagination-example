import React from "react"
import { graphql, useFragment } from "react-relay"
import type { ItemFragment$key } from "./__generated__/ItemFragment.graphql"

const itemFragment = graphql`
  fragment ItemFragment on Item 
  {
     name
     description
  }
`

const Items = ({ item }: { item: ItemFragment$key }): React.ReactNode => {
  const res = useFragment(itemFragment, item)
  return (
    <div>
      <h1>{res.name}</h1>
      <p>{res.description}</p>
    </div>
  )
}

export default Items
