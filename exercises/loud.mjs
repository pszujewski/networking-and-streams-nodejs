import fs from "fs";
import through from "through2"; // Wrapper for working with nodejs Transform stream

fs.createReadStream(process.argv[2]).pipe(toupper()).pipe(process.stdout);

const operateOnDataChunk = (buf) => {
	return buf.toString().toUpperCase();
};

function toupper() {
	return through(function (buf, enc, next) {
		// nodejs Buffer is a binary representation of data
		next(null, operateOnDataChunk(buf));
	});
}

// calling "next" allows you to operate on (transform the given data "chunk" -> the "Buffer")
// And then "through" will handle making sure your string is converted back into a Transform Stream to be piped
// on to the next part of the program.
// Chunks can be arbitrarily large. It's really up to the OS regarding how large the chunks are, so don't write your code
// to be depedent on the chunk size.
