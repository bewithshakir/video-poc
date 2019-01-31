import React from "react";

export default class Videos extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <video key={this.props.videoUrl} controls style={{ width: 100 + "%" }}>
          <source src={this.props.videoUrl} type="application/x-mpegURL" />
          Your browser does not support the video tag or the file format of this
          video.{" "}
          <a href="http://www.webestools.com/">http://www.webestools.com/</a>
        </video>
      </div>
    );
  }
}
