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
