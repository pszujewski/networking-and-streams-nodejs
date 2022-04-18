var net = require("net");
net
	.createServer(function (stream) {
		// For every tcp connection that's incoming it creates a duplex stream.
		// 'stream' is a duplex stream.
		// Doesn't create an infinite loop, it's an 'echo' server
		stream.pipe(stream);
	})
	.listen(5000);
