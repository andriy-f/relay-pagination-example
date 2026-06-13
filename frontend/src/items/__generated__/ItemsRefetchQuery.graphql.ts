/**
 * @generated SignedSource<<693cf881ebf9e5383ba2545cfd05c4a1>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ItemsRefetchQuery$variables = {
  first?: number | null | undefined;
  offset?: number | null | undefined;
  search?: string | null | undefined;
};
export type ItemsRefetchQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ItemsFragment">;
};
export type ItemsRefetchQuery = {
  response: ItemsRefetchQuery$data;
  variables: ItemsRefetchQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": 10,
    "kind": "LocalArgument",
    "name": "first"
  },
  {
    "defaultValue": 0,
    "kind": "LocalArgument",
    "name": "offset"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "search"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  },
  {
    "kind": "Variable",
    "name": "offset",
    "variableName": "offset"
  },
  {
    "kind": "Variable",
    "name": "search",
    "variableName": "search"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ItemsRefetchQuery",
    "selections": [
      {
        "args": (v1/*:: as any*/),
        "kind": "FragmentSpread",
        "name": "ItemsFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Operation",
    "name": "ItemsRefetchQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": "ItemConnection",
        "kind": "LinkedField",
        "name": "searchItems",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ItemEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Item",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "id",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "name",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "description",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "PageInfo",
            "kind": "LinkedField",
            "name": "pageInfo",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "hasNextPage",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "0ec46bdbc7dcc8ce6ae66a253b0f6f94",
    "id": null,
    "metadata": {},
    "name": "ItemsRefetchQuery",
    "operationKind": "query",
    "text": "query ItemsRefetchQuery(\n  $first: Int = 10\n  $offset: Int = 0\n  $search: String\n) {\n  ...ItemsFragment_2pFftX\n}\n\nfragment ItemFragment on Item {\n  name\n  description\n}\n\nfragment ItemsFragment_2pFftX on Query {\n  searchItems(search: $search, first: $first, offset: $offset) {\n    edges {\n      node {\n        id\n        ...ItemFragment\n      }\n    }\n    pageInfo {\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "113f0b25fa99e7881f69d712974acb20";

export default node;
