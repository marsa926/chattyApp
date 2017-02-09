import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    let messageComponents = this.props.messages.map((item) => {


      return <Message key={item.id} username={item.username} content={item.content} />

    });

    return (
      <div id="message-list">
       {messageComponents}
      </div>
    );
  }
}



export default MessageList;

