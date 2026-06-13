/**
 * @generated SignedSource<<ecdbcb4b7d87b756cfd27eb9574ab95d>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ItemsRouteQuery$variables = Record<PropertyKey, never>;
export type ItemsRouteQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ItemsFragment">;
};
export type ItemsRouteQuery = {
  response: ItemsRouteQuery$data;
  variables: ItemsRouteQuery$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ItemsRouteQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "ItemsFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ItemsRouteQuery",
    "selections": [
      {
        "alias": null,
        "args": [
          {
            "kind": "Literal",
            "name": "first",
            "value": 10
          },
          {
            "kind": "Literal",
            "name": "offset",
            "value": 0
          }
        ],
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
        "storageKey": "searchItems(first:10,offset:0)"
      }
    ]
  },
  "params": {
    "cacheID": "33ae8622fe604c049c4e86b3a10a9700",
    "id": null,
    "metadata": {},
    "name": "ItemsRouteQuery",
    "operationKind": "query",
    "text": "query ItemsRouteQuery {\n  ...ItemsFragment\n}\n\nfragment ItemFragment on Item {\n  name\n  description\n}\n\nfragment ItemsFragment on Query {\n  searchItems(first: 10, offset: 0) {\n    edges {\n      node {\n        id\n        ...ItemFragment\n      }\n    }\n    pageInfo {\n      hasNextPage\n    }\n  }\n}\n"
  }
};

(node as any).hash = "031f8ee8b4b0ca8b8cb2bb67b5cacb83";

export default node;
