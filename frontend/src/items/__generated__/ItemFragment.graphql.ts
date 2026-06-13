/**
 * @generated SignedSource<<a78ff92d888d9cd9ae05fdc9d66e64a3>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ItemFragment$data = {
  readonly description: string | null | undefined;
  readonly name: string;
  readonly " $fragmentType": "ItemFragment";
};
export type ItemFragment$key = {
  readonly " $data"?: ItemFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ItemFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ItemFragment",
  "selections": [
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
  "type": "Item",
  "abstractKey": null
};

(node as any).hash = "09d08c129416194a223a0ce7d600f0e2";

export default node;
