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
    <div className="border-2 border-gray-300 rounded-md p-4 mb-4">
      <h1>{res.name}</h1>
      <p>{res.description}</p>
    </div>
  )
}

export default Items
