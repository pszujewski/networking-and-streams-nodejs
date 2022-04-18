var net = require("net");
var crypto = require("crypto");
var pw = "abc123";

var stream = net.connect(5005, "localhost"); // connect to the vpn server, this is the "client" so it is just connecting to the "server"
process.stdin
	.pipe(crypto.createCipher("aes192", pw)) // encrypt everything from stdin that comes in
	.pipe(stream) // pipe it to the vpn server, which will decrypt it and pipe it to the "echo" server
	.pipe(crypto.createDecipher("aes192", pw)) // Decipher the response from the vpn server and pipe it to stdout.
	.pipe(process.stdout);
