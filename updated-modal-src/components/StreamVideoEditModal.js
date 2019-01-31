import React from "react";
import DateTimePicker from "react-datetime-picker";
import { Button, Modal } from "react-bootstrap";

export default class StreamVideoEditModal extends React.Component {
  componentWillMount() {
    //   const
    // this.car = this.props.car;
    // this.onChange = this.props.onChange;
    // this.selectvideo = this.props.selectvideo;
  }

  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Fill time slot of </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-2">
            <label className="mr-2" style={{ width: "100px" }}>
              Start Date
            </label>
            <DateTimePicker
              onChange={date => {
                this.props.context.onChange(date, "startDate");
              }}
              value={this.props.state.selectedVideo.startDate}
            />
          </div>
          <div>
            <label className="mr-2" style={{ width: "100px" }}>
              End Date
            </label>
            <DateTimePicker
              onChange={date => {
                this.props.onChange(date, "endDate");
              }}
              value={this.props.context.state.selectedVideo.endDate}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.onHide}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              this.props.context.onWatchVideo();
            }}
            disabled={
              this.props.context.state.selectedVideo.startDate &&
              this.props.context.state.selectedVideo.endDate
                ? false
                : true
            }
          >
            Watch
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
