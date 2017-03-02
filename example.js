import ttn from "."

// This package provides a sample to test the sdk.
// Replace the app-id and the dev-id and provide your credentials to test it

var options = {
  region: "eu" // Your region (eu or us),
  key: "", // Your app access key
}

var client = new ttn.manager.HTTP(options)

client.getDevice("app-id", "dev-id"
  .then(function (device) {
    console.log(device)
  })
  .catch(function (error) {
    console.error("Got error", error)
  })

client.getDevicesForApplication("app-id")
  .then(function (devices) {
    console.log(devices)
  })
  .catch(function (error) {
    console.error("Got error", error)
  })

client.registerApplication("app-id", {})
  .then(function () {
    console.log("Registered!")
  })
  .catch(function (error) {
    console.error("Got error", error)
  })

client.setApplication("app-id", {
  converter: "function Converter(decoded, port) { return {name: John, lastname: Snow}; }",
  decoder: "function Decoder(bytes, port) { return {test: value}; }",
  validator: "function Validator(conve, port) { return false; }",
  encoder: "function Encoder(object, port) { return []; }",
})
  .then(function () {
    console.log("Set!")
  })
  .catch(function (error) {
    console.error("Got error", error)
  })

client.getApplication("app-id")
  .then(function (app) {
    console.log(app);
  })
  .catch(function (error) {
    console.error("Got error", error)
  })

client.setDevice("app-id", "dev-id", {})
  .then(function () {
    console.log("Set!")
  })
  .catch(function (error) {
    console.error("Got error", error)
  })
