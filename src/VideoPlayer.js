import React from "react";
import videojs from "video.js";

export default class VideoPlayer extends React.Component {
  state = { url: "" };
  constructor() {
    super();
  }
  componentDidMount() {
    this.setState({ url: this.props.videoUrl });
    var player = videojs("my-video");
    console.log("player", player);
    player.src({
      src:
        "https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8",
      type: "application/x-mpegURL"
    });
  }
  componentDidUpdate() {
    var player = videojs("my-video");
    console.log("componentDidUpdate", player);
    // player.src({
    //   src:
    //     "https://b-604520a7.kinesisvideo.us-east-1.amazonaws.com/hls/v1/getHLSMasterPlaylist.m3u8?SessionToken=CiBGuPOlfcjRiXyJ4lV4w2bSzyquFzujQ_jQna2cKpUy0hIQpZ4Lp83YQNKT_J_9oueKfRoZthGVruCop3XdNqW7qQGsJKl4m-k9cGHlkyIgYdLdRQVJvtm4LdUtz-uoL35hfJw300Dq4UseNvDNxlQ~",
    //   type: "application/x-mpegURL"
    // });
  }
  render() {
    return (
      <div>
        <video
          id="my-video"
          className="video-js vjs-default-skin"
          controls
          preload="auto"
          width="1100"
          height="300"
          data-setup="{}"
        >
          {/* <source src={this.props.videoUrl} type="application/x-mpegURL" /> */}
        </video>
      </div>
    );
  }
}

// import React, { Component } from "react";
// import Hls from "hls.js";

// export default class HLSSource extends Component {
//   constructor(props, context) {
//     super(props, context);
//     this.hls = new Hls();
//   }

//   componentDidMount() {
//     // `src` is the property get from this component
//     // `video` is the property insert from `Video` component
//     // `video` is the html5 video element
//     const { src, video } = this.props;
//     // load hls video source base on hls.js
//     if (Hls.isSupported()) {
//       this.hls.loadSource(src);
//       this.hls.attachMedia(video);
//       this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
//         video.play();
//       });
//     }
//   }

//   componentWillUnmount() {
//     // destroy hls video source
//     if (this.hls) {
//       this.hls.destroy();
//     }
//   }

//   render() {
//     return (
//       <source
//         src={this.props.src}
//         type={this.props.type || "application/x-mpegURL"}
//       />
//     );
//   }
// }
