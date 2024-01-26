const dgram = require("node:dgram");
const server = dgram.createSocket("udp4");

server.on("error", (err) => {
  console.error(`server error:\n${err.stack}`);
  server.close();
});
server.on("message", (msg) => {
    const buf = Buffer.from(msg)
    console.log(buf.byteLength);
    //need offset and a few other things.
    console.log(buf.readInt16BE);
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    const arrayString = buf.data.join('-');
    process.stdout.write(arrayString);
});

server.on("listening", () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(5067);
// Prints: server listening 0.0.0.0:41234
