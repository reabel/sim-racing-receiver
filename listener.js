const dgram = require("node:dgram");
const server = dgram.createSocket("udp4");

/**
 * FH 4 is 324, buffer offset is 12
 * FH 5 is 
 */

const mappings = {
  speed: 244,
  unk1: 245,

}

server.on("error", (err) => {
  console.error(`server error:\n${err.stack}`);
  server.close();
});
server.on("message", (msg, rinfo) => {
    const buf = Buffer.from(msg)
    const position = 244;
    let offset = 0;
    if(buf.byteLength === 324)
      offset = 12
    process.stdout.clearLine();
    process.stdout.cursorTo(0);

    //need offset and a few other things.
    //speed * 2.3 for mph
    // approx 3.5 for kph
    process.stdout.write(
    buf.byteLength + ' ' + 
    position + ' ' +
    'isRaceOn: ' + (buf.readFloatLE() > 0 ? 'Yes': 'No') + ' ' + 
    'speed: ' + buf.readFloatLE(244 + offset).toFixed() * 3.5 + ' ' +
    'gear: ' +buf.readUInt8(304 + offset) + ' '+
    'rpm: ' +buf.readFloatLE(16 + offset).toFixed() + '/' + buf.readFloatLE(8 + offset).toFixed() + ' '+
    'other: ' +buf.readFloatLE(position + offset).toFixed() + ' '
    );

});

server.on("listening", () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(5066);
// Prints: server listening 0.0.0.0:41234
