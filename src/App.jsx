import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {username:"Sara"},
      messages: []
    };
  }


updateUser(e){
  console.log(e);
    if (e.keyCode===13){
      const user = {
        username: e.target.value
      };
       console.log(user);
       this.setState({currentUser:user});

  }

}

  newChat(e){
    console.log("handling");
    if (e.keyCode === 13){
      const newMessage = {
        username: this.state.currentUser.username,
        content: e.target.value
      };
      console.log(newMessage);
      // const message = this.state.messages.concat(newMessage);
      this.socket.send(JSON.stringify(newMessage));
      // this.setState({messages:message});
  }
}




  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001/socketserver');
    this.socket.addEventListener('open', function(event){
      console.log("connected to server localhost:3001");

    });

    this.socket.onmessage = (event) => {
      const newMsg = JSON.parse(event.data);
      console.log(newMsg);
      console.log(this.state);
      const messages = this.state.messages.concat(newMsg);
      this.setState({messages:messages});

    };



  // console.log("componentDidMount <App />");
  // setTimeout(() => {
  //   console.log("Simulating incoming message");
  //   // Add a new message to the list of messages in the data store
  //   const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
  //   const messages = this.state.messages.concat(newMessage);

  //   // Update the state of the app component.
  //   // Calling setState will trigger a call to render() in App and all child components.
  //   this.setState({messages: messages})
  // }, 3000);
}






  render() {

      return (
        <div className="wrapper">
        <nav>
        <h1>Chatty</h1>
        </nav>
      <MessageList messages={this.state.messages}/>
      <ChatBar updateUser={this.updateUser.bind(this)} newChat={this.newChat.bind(this)} />
      </div>

    );
  }
}
export default App;


