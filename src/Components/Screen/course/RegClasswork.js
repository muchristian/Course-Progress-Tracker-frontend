import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/action";

class RegClassworks extends Component {
  state = {
    title: "",
    date: "",
    type: "",
  };
  componentDidMount() {
    if (Object.keys(this.props.editClassworkData).length > 0) {
      const { title, date, type } = this.props.editClassworkData;
      this.setState({ title });
      this.setState({ date });
      this.setState({ type });
    }
  }
  onChangeTitle(e) {
    this.setState({ title: e.target.value });
  }
  onChangeType(e) {
    this.setState({ type: e.target.value });
  }
  onChangeDate(e) {
    this.setState({ date: e.target.value });
  }
  onCloseModal = () => {
    this.setState({ title: "" });
    this.setState({ date: "" });
    this.setState({ type: "" });
    this.props.close();
  };
  onSubmit(e) {
    if (Object.keys(this.props.editClassworkData).length === 0) {
      this.props.onRegClasswork({ ...this.state, course: this.props.id });
    } else {
      this.props.onUpdateClasswork(
        { ...this.state },
        this.props.id,
        this.props.editClassworkData.id
      );
    }
  }
  render() {
    const { show, close } = this.props;
    const { title, date, type } = this.state;
    const styles = show ? { paddingRight: "17px", display: "block" } : {};
    return (
      <div
        class={`modal fade ${show ? "show" : ""}`}
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-modal="true"
        style={styles}
      >
        <div class="modal-dialog" role="document">
          <form class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Register Classwork
              </h5>
              <button
                type="button"
                class="close"
                onClick={close}
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="form-group row">
                <div class="col-md-4 pr-8 pl-8">
                  <input
                    type="text"
                    class="form-control"
                    value={title}
                    placeholder="classwork"
                    onChange={(e) => this.onChangeTitle(e)}
                  />
                </div>
                <div class="col-md-4 pr-8 pl-8">
                  <input
                    type="text"
                    class="form-control"
                    value={type}
                    placeholder="type"
                    onChange={(e) => this.onChangeType(e)}
                  />
                </div>
                <div class="col-md-4 pr-8 pl-8">
                  <input
                    type="date"
                    value={date}
                    class="form-control"
                    onChange={(e) => this.onChangeDate(e)}
                  />
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
                onClick={close}
              >
                Cancel
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => this.onSubmit()}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRegClasswork: (data) => dispatch(actions.registerClasswork(data)),
    onUpdateClasswork: (data, id, classworkId) =>
      dispatch(actions.updateClasswork(data, id, classworkId)),
  };
};

export default connect(null, mapDispatchToProps)(RegClassworks);
