import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Notification from './Notification.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {username:"Anonymous"},
      messages: [],
      onlineUsers: "",
    };
  }

  updateUser(e){
    if (e.keyCode===13){
      const oldUsername = this.state.currentUser.username;
      const newUsername = e.target.value;
      const user = {
        username: e.target.value,
        type: "postNotification",
        content: `${oldUsername} changed their username to ${newUsername}`
      };
      this.setState({
        currentUser: {
          username:newUsername
        }
      });
      this.socket.send(JSON.stringify(user));
    }
  }

  newChat(e){
    console.log("handling");
    if (e.keyCode === 13){
      const newMessage = {
        username: this.state.currentUser.username,
        content: e.target.value,
        type: "postMessage"
      };
    this.socket.send(JSON.stringify(newMessage));
    }
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001/socketserver');
    this.socket.addEventListener('open', function(event){
      console.log("connected to server localhost:3001");
    });
    this.socket.onmessage = (event) => {
      const newMsg = JSON.parse(event.data);
      switch(newMsg.type){
        case "onlineUsersNumber":
          this.setState({
            onlineUsers:newMsg.data
          });
          break;
        case "incomingMessage":
          const messages = this.state.messages.concat(newMsg);
          console.log(messages,"this is the message");
          this.setState({
            messages:messages
          });
          this.setState({
            notification:""
          });
          break;
        case "incomingNotification":
          const notificationMsg = `${this.state.currentUser.username} has changes their name to ${newMsg.username}.`;
          const updatedUsername = {
            id:newMsg.id,
            content: newMsg.content,
            type: newMsg.type
          };
          const newMessages = this.state.messages.concat(updatedUsername);
          this.setState({messages:newMessages});
          break;
      }
    };
  }

  render() {
      return (
        <div className="wrapper">
          <nav>
            <h1>Chatty</h1>
            <h3>{this.state.onlineUsers} users online</h3>
          </nav>
          <MessageList messages={this.state.messages} notification={this.state.notification} />
          <ChatBar updateUser={this.updateUser.bind(this)} newChat={this.newChat.bind(this)} />
        </div>
    );
  }
}

export default App;


