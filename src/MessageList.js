import React, { Component } from "react";

class MessageList extends Component {
  render() {
    return (
      <ul className="message-list">
        {this.props.messages.map((message, index) => {
          return (
            <li key={message.id}>
              <div>{message.senderId}</div>
              <span className="message-text">{message.text}</span>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default MessageList;
