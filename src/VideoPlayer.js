import React from "react";

export default class VideoPlayer extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        {/* <video ref={node => (this.videoNode = node)} className="video-js" /> */}
        <video key={this.props.videoUrl} controls style={{ width: 100 + "%" }}>
          <source src={this.props.videoUrl} type="video/mp4" />
          Your browser does not support the video tag or the file format of this
          video.{" "}
          <a href="http://www.webestools.com/">http://www.webestools.com/</a>
        </video>
      </div>
    );
  }
}
