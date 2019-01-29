import React, { Component } from "react";
import DateTimePicker from "react-datetime-picker";

import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      videos: [
        {
          poster:
            "http://www.webestools.com/page/media/videoTag/BigBuckBunny.png",
          url:
            "https://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4"
        }
      ],
      cars: [
        {
          modal: "Car1"
        },
        {
          modal: "Car2"
        }
      ],
      selectedDate: {
        startDate: new Date(),
        endDate: new Date()
      },
      selectedVideo:
        "https://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4"
    };

    this.defaultVideoPoster = this.state.videos[0].poster;
    this.defaultVideo = this.state.videos[0].url;
  }

  // fetchVideo(video) {
  //   this.setState({selectedVideo: video})
  // }

  onChange(date, type) {
    if (type === "startDate") {
      this.setState({
        selectedDate: { ...this.state.selectedDate, startDate: date }
      });
    } else if (type === "endDate") {
      this.setState({
        selectedDate: { ...this.state.selectedDate, endDate: date }
      });
    }
  }

  onWatchVideo() {
    console.log("fn", this.state);
  }

  renderCarRow() {
    return this.state.cars.map((car, i) => {
      return (
        <tr key={i}>
          <th scope="row" style={{ textAlign: "left" }}>
            {car.modal}
          </th>
          <td>
            <button
              className="btn btn-success mb-2"
              type="button"
              data-toggle="modal"
              data-target={"#" + car.modal}
            >
              View
            </button>
            <div className="modal fade" id={car.modal} tabIndex="-1">
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Fill time slot</h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="dropdown d-flex mb-1">
                      <label className="mr-2" style={{ width: "100px" }}>
                        Start Date
                      </label>
                      <DateTimePicker
                        onChange={date => {
                          this.onChange(date, "startDate");
                        }}
                        value={this.state.selectedDate.startDate}
                      />
                    </div>
                    <div className="dropdown d-flex mb-1">
                      <label className="mr-2" style={{ width: "100px" }}>
                        End Date
                      </label>
                      <DateTimePicker
                        onChange={date => {
                          this.onChange(date, "endDate");
                        }}
                        value={this.state.selectedDate.endDate}
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => this.onWatchVideo()}
                    >
                      View Video
                    </button>
                  </div>
                </div>
              </div>
            </div>
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
                    controls
                    poster={this.defaultVideoPoster}
                    style={{ width: 100 + "%" }}
                  >
                    <source src={this.defaultVideo} type="video/mp4" />
                    Your browser does not support the video tag or the file
                    format of this video.{" "}
                    <a href="http://www.webestools.com/">
                      http://www.webestools.com/
                    </a>
                  </video>
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
