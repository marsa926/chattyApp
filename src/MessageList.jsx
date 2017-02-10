import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    return(
      <div id="message-list">
        {this.props.messages.map((item)=>{
          if(item.type === "incomingMessage"){
            return <Message key={item.id} username={item.username} content={item.content} />;
          } else if (item.type === "incomingNotification"){
            return <div key={item.id} className="message system"> {item.content} </div>;
          }
        })}
      </div>
    )
  }
}


export default MessageList;

