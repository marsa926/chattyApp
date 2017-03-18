import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    return (
      <footer>
        <input id="username" type="text" placeholder="Your Name (Optional)" onKeyUp={this.props.updateUser} />
        <input id="new-message" type="text" placeholder="Type a message and hit ENTER" onKeyUp={this.props.newChat} />
      </footer>
    );
  }
}

export default ChatBar;


