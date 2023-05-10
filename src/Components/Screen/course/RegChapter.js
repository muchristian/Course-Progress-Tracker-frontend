import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/action";

class RegChapter extends Component {
  state = {
    title: "",
    text: "",
  };
  componentDidMount() {
    if (Object.keys(this.props.editChapterData).length > 0) {
      const { title, text } = this.props.editChapterData;
      this.setState({ title });
      this.setState({ text });
    }
  }

  onCloseModal = () => {
    this.setState({ title: "" });
    this.setState({ text: "" });
    this.props.close();
  };
  onChangeChapter = (el) => {
    this.setState({ ...this.state, [el.target.name]: el.target.value });
  };
  onSubmit() {
    if (Object.keys(this.props.editChapterData).length === 0) {
      this.props.onRegChapter(
        { ...this.state, session: this.props.sessionId },
        this.props.id,
        this.props.sessionId
      );
    } else {
      this.props.onUpdateChapter(
        { ...this.state },
        this.props.id,
        this.props.sessionId,
        this.props.editChapterData.id
      );
    }
  }
  render() {
    const { show, sessionId } = this.props;
    const { title, text } = this.state;
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
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Register New Chapters
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
                <div class="col-md-8">
                  <input
                    type="text"
                    class="form-control"
                    value={title}
                    onChange={this.onChangeChapter}
                    placeholder="title"
                    name="title"
                  />
                </div>
                <div class="col-md-8 pt-3">
                  <textarea
                    class="form-control"
                    value={text}
                    onChange={this.onChangeChapter}
                    placeholder="write some note..."
                    name="text"
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
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRegChapter: (data, id, sessionId) =>
      dispatch(actions.registerChapter(data, id, sessionId)),
    onUpdateChapter: (data, id, sessionId, chapterId) =>
      dispatch(actions.updateChapter(data, id, sessionId, chapterId)),
  };
};

export default connect(null, mapDispatchToProps)(RegChapter);
