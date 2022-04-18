import concat from "concat-stream";
import http from "http";
import through from "through2";
import qs from "querystring";

const server = http.createServer((req, res) => {
	// Pipe the request into a concat stream, which will concat all the data chunks received
	// via the request stream, encode the chunks of binary data as a string, and buffer all the
	// data in memory as a single piece (here called 'body', as in 'request body'). This is for when you absolutely need to operate on the entirety of
	// the data rather than single chuns at a time. For example, with a json string, you need
	// all the json to actually operate on the json probably. So you can't use a stream to operate when you need the whole since
	// streams operate on chunks of binary data at a time.

	// It's a good idea to set a limit on the number of bytes that can be sent. Here I'm arbitrarily setting the limit to
	// 20 bytes. Calling `next(null, null)` will "end" the stream
	function counter() {
		let size = 0;
		return through((buf, enc, next) => {
			size += buf.length;
			if (size > 20) next(null, null); // this will simply end the stream
			// if (size > 20) res.end('You sent too much data! Too big!')
			else next(null, buf);
		});
	}

	req.pipe(counter()).pipe(
		concat({ encoding: "string" }, (body) => {
			const params = qs.parse(body);
			console.log(params);
			res.end("ok\n");
		})
	);
});

server.listen(5000);

// run the server and send a request with curl
// curl -d msg=hello localhost:5000
// the server should print { msg: "hello" }
