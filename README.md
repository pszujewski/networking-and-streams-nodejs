# Networking and Streams

## Servers and clients

Any networked computer can be a "server" and any networked computer can be a "client". These are more roles that computers play, rather than a "physical" description of them. They are roles that computers play in how we use them.

A server is a role that a computer program can play. It is really any program that is listening for incoming connections. Any computer tha has a networking stack can run a server. A client on the other hand is a computer program that connect to the servers. Clients initiate the connection with the server.

## Packets

Chunks of data sent over the network. Packets are not guaranteed to come in the correct order, so they are sent along with some metadata that allows the client to reconstruct the whole from the packets.

## TCP vs. UDP

TCP is reliable transport: if a packet is not acknowledged (ACK) on the other end, it gets reset.

UDP is unreliable transport: packets are sent by there i sno confirmation of reception from the intended receiver.

## Protocols

Built on top of TCP and UDP:

HTTP - browse web pages (customary port 80)
HTTPS - browse web pages with encryption (customary port 443)
SSH - remote shell over an encrypted connection (customary port 2)
SMTP - send and receive emails (customary port 25)
SSL - low-level secure data transfer (used by HTTPS)
FTP - file transfer (customary port 21)

These usually have a default port, or a standard port. But the port can vary for each service. You can always run on a different port (think HTTP running on :5000 instead of :80).

## netcat

A networking utility that reads and writes data across network connections using the TCP/IP protocol.

```bash
$ nc -lp 5000

$ nc localhost 5000
```

Then these two processes can send and receive data respectively.

## http verbs

HTTP is a text based data transfer protocol that works over TCP. HTTP requests begin with a verb. Here are some things each verb is used for:

GET - fetch a document
POST - submit a form
HEAD - fetch metadata about a documet
PUT - upload a file

Try this to send an http request to google over tcp using http.

```bash
nc google.com 80
GET / HTTP/1.0
HOST: google.com
```

## http post

Forms in html are often delivered with a POST:

```bash
POST /form HTTP/1.1
HOST: localhost
Content-Length: 51 # refers to the length of the request body (or response body for a response)
Content-Type: application/x-www-form-urlencoded

title=whatever&date=1421044443&data=beep&20boop%21
```

## curl

You can also send http requests with the `curl` command. It prints the http response to stdout.

```bash
curl -s http://substack.net # the -s gets rid of progress output

curl -sI http://substack.net # to see just the headers

curl -X POST http://site.com -d title=whatever -d date=1421044443 -d body='beep boop!' # to send a POST with formdata

curl ... -H cool:beans # set a header
```

## Binary protocols

irc and smtp are other examples of text based protocols. They are easy to inspect as they travel over the network. With binary protocols, you need a program to pack and unpack the bytes sent over the protocol.

Use tcpdump to intercept all network traffic on a port. For example:

`sudo tcpdump 'tcp port 80' -A`

The `-A` is for formatting. This will listen on port 80, so any unencrypted http traffic is caught here.

## Streams in node.js

Streams are great for moving data around for IO. Think of it as connecting programs like garden hose--screw. Chaining programs together like pipes.

Why streams? We can compose streaming abstractions and we can operate on data chunk by chunk. For example, for a several hundred MB video file that is served by your web server, rather than needing to load the entire video file into main memory in order to serve it out, you can stream the file to the client and therefore allow you to only load small chunks of that data into memory at a time. You could also operate on each chunk if need be (transform stream). Maybe you have thousands of video files. You can't read in the entire files and then write it out to the client. You have to pick it out bit by bit.

The Buffer object in nodejs is a representation of binary data.

## Stream types

- Readable: Produces data, you can `.pipe()` FROM it.
  Sources of data, like `fs.createReadStream`
  `readable.pipe(A) // Pipe from a readable stream into some kind of writable stream`
- Writable: Consumes data, you can `.pipe()` TO it.
  Destinations where the data flows to. For example, `fs.createWriteStream` which streams data to a file on disk.
  `A.pipe(writable)`
- Transform: Consumes data, producing transformed data
  Readable and writable
  Take input and produce output
  `A.pipe(transform).pipe(B) // Put them between two streams`
- Duplex: Consumes data separately from producing data (like a telephone, both sides can be talking)
  Readable and writable
  Bi-directional network protocols
  `A.pipe(duplex).pipe(A)`

## Writable stream methods

`.pipe()` is a method of all readable streams. Any stream you can write to has

- `.write(buf) // write a buffer chunk to the stream`
- `.end() // close the stream`
- `.on('finish', () => { ... }) // on the finish event`
