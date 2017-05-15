import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ImageMessage extends Component {
  constructor(props) {
    super(props);

    this.generateThumbnail = this.generateThumbnail.bind(this);
  }

  componentDidMount() {
    this.generateThumbnail();
  }

  // WIP - intent here is to generate a thumbnail on the fly
  // with a max height dimension, which scales original image.
  // Also generate a download link that allows people to download
  // the original image data.
  generateThumbnail() {
    let { imageData } = this.props;

    let image = new Image();
    image.onload = (e) => {
      const canvas = this.refs.imageCanvas;
      const context = canvas.getContext("2d");
      context.drawImage(e.target.result, 0, 0);
    };
    image.src = `data:base64,${imageData}`;
  }

  render() {
    let { imageData } = this.props;
    const dataHref = `data:base64,${imageData}`;

    return (
      <div>
        <canvas ref="imageCanvas"></canvas>
        <br />
        <a href={dataHref}>Download</a>
      </div>
    );
  }
}

ImageMessage.propTypes = {
  imageData: PropTypes.string.isRequired
};

export default ImageMessage;