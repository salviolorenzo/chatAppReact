import React, { Component } from "react";
import MessageList from "./MessageList";
import SendMessageForm from "./SendMessageForm";
import Chatkit from "@pusher/chatkit-client";
import "./App.css";

function Title() {
  return <p className="title">My Chat App</p>;
}

const instanceLocator = "v1:us1:c2fb506e-2001-45b6-a3aa-66269ed46067";
const testToken =
  "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/c2fb506e-2001-45b6-a3aa-66269ed46067/token";
const username = "Lorenzo";
const roomId = "19374891";

class App extends Component {
  constructor() {
    super();
    this.state = {
      messages: []
    };
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: instanceLocator,
      userId: username,
      tokenProvider: new Chatkit.TokenProvider({
        url: testToken
      })
    });
    chatManager.connect().then(currentUser => {
      this.currentUser = currentUser;
      this.currentUser.subscribeToRoom({
        roomId: roomId,
        hooks: {
          onNewMessage: message => {
            this.setState({
              messages: [...this.state.messages, message]
            });
          }
        }
      });
    });
  }

  sendMessage(text) {
    this.currentUser.sendMessage({
      text,
      roomId: roomId
    });
  }

  render() {
    return (
      <div className="app">
        <Title />
        <MessageList
          roomId={this.state.roomId}
          messages={this.state.messages}
        />
        <SendMessageForm sendMessage={this.sendMessage} />
      </div>
    );
  }
}

export default App;
