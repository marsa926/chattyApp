const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('node-uuid');
// Set the port to 4000
const PORT = 3001;
const WebSocket = require('ws');

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });


// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.


wss.on('connection', (ws) => {
  ws.on('message', function incoming(message){
    const newMessage = JSON.parse(message);
    newMessage.id = uuid.v1();
    console.log("User",newMessage.username,"said",newMessage.content);
    console.log(newMessage);
    wss.clients.forEach(function each(client){
      if(client.readyState===WebSocket.OPEN){
        client.send(JSON.stringify(newMessage));
      }
    });
  });

  console.log('Client connected');

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});