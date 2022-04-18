import through from "through2";

// Use stdin to allow command line chaining

process.stdin.pipe(toupper()).pipe(process.stdout);

function toupper() {
	return through(function (buf, enc, next) {
		next(null, buf.toString().toUpperCase());
	});
}
