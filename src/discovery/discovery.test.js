/* eslint-env jest */
/* eslint-disable arrow-body-style */

import { Discovery } from "./discovery"

test("Constructor should work", () => {
  const client = new Discovery({
    address: "localhost:4000",
  })
})
