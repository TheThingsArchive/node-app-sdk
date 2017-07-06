import fs from "fs"
import { Discovery, services } from "../src/discovery"

const main = async function () {
  const client = new Discovery({
    address: "localhost:1900",
    certificate: fs.readFileSync("../ttn/.env/discovery/server.cert"),
  })

  const handlers = await client.getAll(services.handler)
  const handlerDev = await client.get(services.handler, "dev")

  console.log(`Found ${handlers.length} handlers in total:`)
  handlers.forEach(handler => console.log(`  - ${handler.id}`))

  console.log("")
  console.log("Dev handler announcement:")
  console.log(handlerDev)
}

main()
  .catch(function (err) {
    console.error(err)
    process.exit(1)
  })
