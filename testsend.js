const dgram = require("node:dgram");
const { Buffer } = require("node:buffer");

const message = Buffer.from("Some bytes");
const client = dgram.createSocket("udp4");
client.send(message, 5067, "0.0.0.0", (err) => {
  err ? console.error(err) : console.log("sent");
  client.close();
});
