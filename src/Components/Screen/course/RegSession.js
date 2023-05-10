import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/action";

class RegSession extends Component {
  state = {
    title: "",
  };
  componentDidMount() {
    if (Object.keys(this.props.editSessionData).length > 0) {
      const { title } = this.props.editSessionData;
      this.setState({ title });
    }
  }
  onChangeTitle(e) {
    this.setState({ title: e.target.value });
  }
  onCloseModal = () => {
    this.setState({ title: "" });
    this.props.close();
  };
  async onSubmit() {
    if (Object.keys(this.props.editSessionData).length === 0) {
      await this.props.onRegSession({
        ...this.state,
        course: this.props.id,
        department: this.props.department,
        course_name: this.props.course_name,
        course_code: this.props.course_code,
      });
    } else {
      this.props.onUpdateSession(
        { ...this.state },
        this.props.id,
        this.props.editSessionData.id
      );
    }
  }
  render() {
    const { show } = this.props;
    const { title } = this.state;
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
                Register Session
              </h5>
              <button
                type="button"
                class="close"
                onClick={this.onCloseModal}
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
                    placeholder="week"
                    onChange={(e) => this.onChangeTitle(e)}
                  />
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
                onClick={this.onCloseModal}
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
    onRegSession: (data) => dispatch(actions.registerSession(data)),
    onUpdateSession: (data, id, sessionId) =>
      dispatch(actions.updateSession(data, id, sessionId)),
  };
};

export default connect(null, mapDispatchToProps)(RegSession);
