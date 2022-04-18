var net = require("net");
var crypto = require("crypto");
var pump = require("pump");
var pw = "abc123";

net
	.createServer(function (stream) {
		pump(
			stream,
			crypto.createDecipher("aes192", pw), // decrypt stream
			net.connect(5000, "localhost"), // stream it to the echo server
			crypto.createCipher("aes192", pw), // encrypt the stream
			stream, // stream it to the client
			function (err) {
				console.error(err);
			}
		);
	})
	.listen(5005);
