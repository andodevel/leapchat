import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Button } from 'react-bootstrap';
import Dropzone from 'react-dropzone';

const btoa = require('btoa');


class MessageForm extends Component {
  constructor(props){
    super(props);

    this.onMessageUpdate = this.onMessageUpdate.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onSendMessage = this.onSendMessage.bind(this);

    this.onDrop = this.onDrop.bind(this);
    this.onMessageUpdate = this.onMessageUpdate.bind(this);
    this.clearMessage = this.clearMessage.bind(this);
    this.convertFileToBinary = this.convertFileToBinary.bind(this);

    // just stick this crap here, goddamn puritanical objections
    // about state in child components.
    this.state = {
      message: '',
      queuedFiled: undefined
    }
  }

  // single-file / picture support for now.
  onDrop(files){
    if (files){
      this.convertFileToBinary(files[0])
    }
  }

  onMessageUpdate(e){
    this.setState({
      message: e.target.value
    });
  }

  onKeyPress(e){
    // Send on <enter> unless <shift-enter> has been pressed
    if (e.key === 'Enter' && !e.nativeEvent.shiftKey){
      this.onSendMessage(e);
    }
  }

  // TODO: validate file type, should be image
  isPayloadValid(message, file){
    if (file){
      // validate file contents, message not needed.
      // TODO: there should be a maximum file size, probably
      if (file && file.length > 0){
        return true;
      }
    } else {
      // if no file, we should have a message to send
      if (message && message.length > 0){
        return true;
      }
      return false;
    }
  }

  clearMessage(){
    this.setState({
      message: '',
      queuedFile: undefined
    });
  }

  convertFileToBinary(queuedFile){
    var reader = new FileReader();
    reader.addEventListener('loadend', (e) => {
      this.setState({
        queuedFile: btoa(e.target.result)
      });

    });
    reader.readAsBinaryString(queuedFile);
  }

  onSendMessage(e){
    e.preventDefault();
    let { message, queuedFile } = this.state;

    if (!this.isPayloadValid(message, queuedFile)){
      return false;
    }

    this.props.onSendMessage(message, queuedFile);

    this.clearMessage();
  }

  render(){
    let { message } = this.state;
    let dropzoneRef;

    return (
      <div className="message-form">
        <form role="form" className="form" onSubmit={this.onSendMessage}>

          <div style={{'position': 'relative'}}>
            <Button onClick={this.onSendMessage} className="send">
              <i className="fa fa-arrow-circle-right fa-2x"></i>
            </Button>

            <div className="message">
              <textarea
                className="form-control"
                onChange={this.onMessageUpdate}
                onKeyPress={this.onKeyPress}
                name="message"
                value={message}
                placeholder="Enter message" required></textarea>
            </div>

            <div style={{'position': 'absolute', 'left': '0px', 'bottom': '0px', 'width': '30px'}}>
              <Dropzone
                style={{'width': '0px', 'height': '0px'}}
                ref={(node) => { dropzoneRef = node; }}
                onDrop={this.onDrop}>
              </Dropzone>
              <Button onClick={() => { dropzoneRef.open() }}>
                <i className="fa fa-paperclip" aria-hidden="true"></i>
              </Button>
            </div>

          </div>
        </form>
      </div>
    );
  }
}

export default MessageForm;
