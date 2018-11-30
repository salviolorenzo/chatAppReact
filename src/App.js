import React, { Component } from "react";
import MessageList from "./MessageList";
import Chatkit from "@pusher/chatkit-client";
import logo from "./logo.svg";
import "./App.css";

const DUMMY_DATA = [
  {
    senderId: "Lorenz",
    text: "What it is"
  },
  {
    senderId: "Jane",
    text: "ay"
  }
];

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
        {/* <Title title={"ChatRoom"} /> */}
        <MessageList
          roomId={this.state.roomId}
          messages={this.state.messages}
        />
        {/* <SendMessageForm /> */}
      </div>
    );
  }
}

export default App;
