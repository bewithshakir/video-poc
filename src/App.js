import React, { Component } from "react";
import DateTimePicker from "react-datetime-picker";
import { Button, Modal } from "react-bootstrap";
import axios from "./api";
import "./App.css";
import videojs from "video.js";

class App extends Component {
  constructor() {
    super();
    this.state = {
      url: null,
      cars: [
        {
          carId: "Car1"
        },
        {
          carId: "Car2"
        }
      ],
      selectedVideo: {
        carid: "",
        carStream: "DemoVideoStream",
        startDate: new Date(),
        endDate: new Date()
      },
      show: false
    };
  }

  componentDidMount() {
    var player = videojs("my-video");
    player.src({
      src:
        "http://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8",
      type: "application/x-mpegURL"
    });
  }

  dateFormater(dateObj) {
    const time = dateObj.toLocaleTimeString("it-IT");
    const date = dateObj.toLocaleDateString("ja", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    });
    return `${date} ${time}`;
  }

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = carId => {
    // this.setState({
    //   show: true
    // });
    this.setState({
      show: true,
      selectedVideo: {
        ...this.state.selectedVideo,
        carid: carId
      }
    });
  };

  onChange(date, type) {
    if (type === "startDate") {
      this.setState({
        selectedVideo: { ...this.state.selectedVideo, startDate: date }
      });
    } else if (type === "endDate") {
      this.setState({
        selectedVideo: { ...this.state.selectedVideo, endDate: date }
      });
    }
  }

  onWatchVideo = async () => {
    const config = { headers: { "Content-Type": "application/json" } };
    const customData = {
      carId: "DemoVideoStream",
      carStream: this.state.selectedVideo.carid,
      startDate: this.state.selectedVideo.startDate.toString(),
      endDate: this.state.selectedVideo.endDate.toString()
    };
    try {
      const response = await axios.put(
        "https://5yoo6hgmk5.execute-api.us-east-1.amazonaws.com/prototype",
        customData,
        config
      );

      if (response.data.errorMessage) {
        throw response.data.errorMessage;
      } else {
        let vUrl = response.data.HLSStreamingSessionURL;
        this.setState({ url: vUrl, show: false });
        var player = videojs("my-video");
        player.src({
          src: this.state.url,
          type: "application/x-mpegURL"
        });
      }
    } catch (error) {
      alert(error);
    }
  };

  renderCarRow() {
    return this.state.cars.map((car, i) => {
      return (
        <tr key={i}>
          <th scope="row" style={{ textAlign: "left" }}>
            {car.carId}
          </th>
          <td>
            <Button
              variant="success"
              onClick={() => this.handleShow(car.carId)}
            >
              View
            </Button>

            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Fill time slot of {car.carId}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="mb-2">
                  <label className="mr-2" style={{ width: "100px" }}>
                    Start Date
                  </label>
                  <DateTimePicker
                    onChange={date => {
                      this.onChange(date, "startDate");
                    }}
                    value={this.state.selectedVideo.startDate}
                  />
                </div>
                <div>
                  <label className="mr-2" style={{ width: "100px" }}>
                    End Date
                  </label>
                  <DateTimePicker
                    onChange={date => {
                      this.onChange(date, "endDate");
                    }}
                    value={this.state.selectedVideo.endDate}
                  />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                  Close
                </Button>
                <Button
                  variant="primary"
                  onClick={this.onWatchVideo}
                  disabled={
                    this.state.selectedVideo.startDate &&
                    this.state.selectedVideo.endDate
                      ? false
                      : true
                  }
                >
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="App">
        <header>
          <div className="navbar navbar-dark bg-dark shadow-sm">
            <div className="container d-flex justify-content-between">
              <a href="#" className="navbar-brand d-flex align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                  focusable="false"
                  aria-hidden="true"
                >
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
                <strong>VIDEO</strong>
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarHeader"
                aria-controls="navbarHeader"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>
            </div>
          </div>
        </header>
        <main>
          <section className="jumbotron text-center pt-4">
            <div className="container">
              {/* <h1 className="jumbotron-heading">Device</h1> */}
              <table className="table table-dark">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>{this.renderCarRow()}</tbody>
              </table>
            </div>
            <div className="container">
              <div className="row justify-content-center align-items-center">
                <div className="col-lg-12">
                  <video
                    id="my-video"
                    className="video-js vjs-default-skin"
                    controls
                    preload="auto"
                    style={{ width: 100 + "%" }}
                    data-setup="{}"
                  />
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }
}

export default App;
