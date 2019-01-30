import React, { Component } from "react";
import DateTimePicker from "react-datetime-picker";
import { Button, Modal } from "react-bootstrap";

import "videojs-contrib-hls";

import VideoPlayer from "./VideoPlayer";

import axios from "./api";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      url:
        "https://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4",
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
        startDate: null,
        endDate: null
      },
      show: false
    };
  }

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = carId => {
    this.setState({
      show: true,
      selectedVideo: {
        ...this.state.selectedVideo,
        carid: carId,
        startDate: null,
        endDate: null
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

    const response = await axios.put(
      "https://znj756ajji.execute-api.us-east-1.amazonaws.com/prototype",
      this.state.selectedVideo,
      config
    );
    this.setState({ url: response.data.videourl, show: false });
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
    console.log("render", this.state.url);
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
                  {/* <VideoPlayer {...this.videoJsOptions} /> */}

                  {/* <video controls style={{ width: 100 + "%" }}>
                    <source src={this.state.url} type="video/mp4" />
                    Your browser does not support the video tag or the file
                    format of this video.{" "}
                    <a href="http://www.webestools.com/">
                      http://www.webestools.com/
                    </a>
                  </video> */}
                  <VideoPlayer videoUrl={this.state.url} />
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
