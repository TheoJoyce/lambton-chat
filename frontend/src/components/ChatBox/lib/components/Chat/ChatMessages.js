import React from 'react';

import { ChatBox } from '../../../lib';
import  '../../../lib/style.css';
import '../../style.css';


class ChatMessages extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      user: {},
    };
  }

  componentDidMount() {
    const messages = [
      {
        "text": "Hello there",
        "id": "1",
        "sender": {
          "name": "Employee 1",
          "uid": "user1",
          "avatar": "https://data.cometchat.com/assets/images/avatars/ironman.png",
        },
      },
      {
        "text": "Hi",
        "id": "2",
        "sender": {
          "name": "Employee 2",
          "uid": "user2",
          "avatar": "https://data.cometchat.com/assets/images/avatars/spiderman.png",
        },
      },
      {
        "text": "Hello,how are you today?",
        "id": "3",
        "sender": {
          "name": "Employee 1",
          "uid": "user1",
          "avatar": "https://data.cometchat.com/assets/images/avatars/ironman.png",
        },
      },
    ];

    const user = {
      "uid": "user1"
    };

    this.setState({ messages: messages, user: user });

  }

  render() {
    return (
      <div className='container' style={{width:'100%', paddingTop: '50px'}}>
        <div className='chat-header' style={{textAlign:'center'}}>
          <h5>Server Chat</h5>
        </div>
        <ChatBox messages={this.state.messages} />
      </div>
    )
  }
}

export default ChatMessages;