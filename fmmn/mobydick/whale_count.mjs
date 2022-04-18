import fs from "fs";
import zlib from "zlib";

fs.createReadStream("./mobydick.txt.gz")
	.pipe(zlib.createGunzip())
	.pipe(process.stdout);
