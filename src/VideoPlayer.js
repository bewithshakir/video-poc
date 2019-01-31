import React from "react";

export default class VideoPlayer extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.videoUrl != this.props.videoUrl) {
      this.refs["videoPlayer"].firstChild.src = this.props.videoUrl;
      this.refs["videoPlayer"].load();
      console.log("nextPropssssss");
    }
  }

  // componentDidUpdate() {
  //   this.refs["videoPlayer"].firstChild.src = this.props.videoUrl;
  //   this.refs["videoPlayer"].load();
  // }

  renderSrc(url) {
    return <source src={url} type="application/x-mpegURL" />;
  }

  render() {
    return (
      <div>
        <video
          ref="videoPlayer"
          id="my_video_1"
          className="video-js vjs-default-skin"
          controls
          preload="auto"
          width="1100"
          height="300"
          data-setup="{}"
        >
          <source src={this.props.videoUrl} type="application/x-mpegURL" />
        </video>
      </div>
    );
  }
}
