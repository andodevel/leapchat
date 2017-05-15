import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';

import ImageMessage from './ImageMessage';

function LinkRenderer(props) {
  return <a href={props.href} target="_blank">{props.children}</a>
}

class Message extends Component {
  render(){
    let { message, username } = this.props;
    let fromMe = message.from === username;
    let messageClass = fromMe ? 'chat-outgoing' : 'chat-incoming';

    let isMessage = Object.keys(message).indexOf('msg') > -1;
    let isPicture = Object.keys(message).indexOf('image_data') > -1;

    return (
      <li className={messageClass} key={message.key}>
        <span className="username">{message.from}</span>
        {isMessage && <ReactMarkdown
                        source={message.msg}
                        renderers={{Link: LinkRenderer}}
                        escapeHtml={true} />}

        {isPicture && <ImageMessage
                        imageData={message.image_data} />}
      </li>
    );
  }
}

export default Message;
