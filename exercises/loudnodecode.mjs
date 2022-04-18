import { Transform } from "stream";

// Use stdin to allow command line chaining

process.stdin.pipe(toupper()).pipe(process.stdout);

function toupper() {
	return new Transform({
		transform: (buffer, enc, next) => {
			next(null, buffer.toString().toUpperCase());
		},
	});
}
