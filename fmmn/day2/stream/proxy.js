// node proxy.js
// in another terminal
// nc localhost 5005 -> connect to the proxy server

var net = require("net");
net
	.createServer(function (stream) {
		stream.pipe(net.connect(5000, "localhost")).pipe(stream);
	})
	.listen(5005);
