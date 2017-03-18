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

function sendoutMessage(){
  wss.clients.forEach(function each(client){
    if(client.readyState===WebSocket.OPEN){
      client.send(JSON.stringify(newMessage));
    }
  });
}

let onlineUsers = 0;
wss.on('connection', (ws) => {
  console.log('Client connected');
  onlineUsers= onlineUsers+1;
  wss.clients.forEach(function each(client){
    const newMessage = {type: "onlineUsersNumber", data:onlineUsers};
    client.send(JSON.stringify(newMessage));
  });

  ws.on('message', function incoming(message){
    const newMessage = JSON.parse(message);
    newMessage.id = uuid.v1();
    console.log(newMessage);
    switch(newMessage.type){
      case "postMessage":
        newMessage.type = "incomingMessage";
        sendoutMessage();
        break;
      case "postNotification":
        newMessage.type="incomingNotification";
        sendoutMessage();
        break;
    }
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client Disconnected');
    onlineUsers= onlineUsers-1;
    wss.clients.forEach(function each(client){
      const newMessage = {type: "onlineUsersNumber", data:onlineUsers};
      client.send(JSON.stringify(newMessage));
    });
  });
});

