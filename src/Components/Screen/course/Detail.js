import React, { Component } from "react";
import RegSession from "./RegSession";
import RegChapter from "./RegChapter";
import RegClasswork from "./RegClasswork";
import RegClassRepresenter from "./RegClassRepresenter";
import { connect } from "react-redux";
import * as actions from "../../../store/action";
import { withRouter } from "react-router-dom";
import { isLoggedIn } from "../../../store/action/auth";
import EditBtn from "../../UI/EditBtn";
import DeleteBtn from "../../UI/DeleteBtn";

class Detail extends Component {
  state = {
    chapters: [],
    showChapterModal: false,
    showClassworkModal: false,
    showSessionModal: false,
    showClassRepresenterModal: false,
    session: 0,
    selectedFile: "",
    editChapterData: {},
    editSessionData: {},
    editClassworkData: {},
  };

  async componentDidMount() {
    let search = this.props.location.search;
    let params = new URLSearchParams(search);
    let query = params.get("from");
    if (query === "home") await this.props.onGetCoursesByStatus(2);
    await this.props.onGetCourses();
    await this.props.onGetRoles();
  }

  // async onApproveChapter(data, id) {
  //   await this.props.onApprove(data, id);
  // }

  onChangeChapter(el, index) {
    this.state.chapters[index].title = el.target.value;
    this.setState({ chapters: this.state.chapters });
  }

  openChapterModal(id, event) {
    document.body.classList.add("modal-open");
    this.setState({ showChapterModal: true, session: id });
  }

  openClassRepresenterModal() {
    document.body.classList.add("modal-open");
    this.setState({ showClassRepresenterModal: true });
  }

  openSessionModal() {
    document.body.classList.add("modal-open");
    this.setState({ showSessionModal: true });
  }

  openClassworkModal() {
    document.body.classList.add("modal-open");
    this.setState({ showClassworkModal: true });
  }
  hideModal(event) {
    document.body.classList.remove("modal-open");
    this.setState({
      showChapterModal: false,
      showClassworkModal: false,
      showSessionModal: false,
      editChapterData: {},
      editSessionData: {},
      editClassworkData: {},
    });
  }

  isSessionFinished(isFinished, id, sessionId) {
    this.props.onTickSession({ isFinished: !isFinished }, id, sessionId);
  }

  fileUploadInputChange(event) {
    this.setState({ selectedFile: event.target.files[0] });
  }

  uploadCourseFileFunc(id) {
    const data = new FormData();
    data.append("course_file", this.state.selectedFile);
    this.props.onUploadFile(id, data);
  }

  async updateChapterHandler(id, data) {
    this.setState({ editChapterData: data });
    this.openChapterModal(id);
  }

  async deleteChapterHandler(id, sessionId, chapterId) {
    this.props.onDeleteChapter(id, sessionId, chapterId);
  }

  async updateSessionHandler(data) {
    this.setState({ editSessionData: data });
    this.openSessionModal();
  }

  async deleteSessionHandler(id, sessionId) {
    this.props.onDeleteSession(id, sessionId);
  }

  async updateClassworkHandler(data) {
    this.setState({ editClassworkData: data });
    this.openClassworkModal();
  }

  async deleteClassworkHandler(id, classworkId) {
    this.props.onDeleteClasswork(id, classworkId);
  }

  async downloadFile(id) {
    await this.props.onDownloadFile(id);
  }

  indexes(i) {
    if (i < 0) {
      return 0;
    } else {
      return i - 1;
    }
  }

  render() {
    const {
      showClassRepresenterModal,
      showChapterModal,
      showSessionModal,
      showClassworkModal,
      session,
      editChapterData,
      editClassworkData,
      editSessionData,
    } = this.state;
    const { courses, homeCourses, match, isLoggedIn, roles } = this.props;
    let search = this.props.location.search;
    let params = new URLSearchParams(search);
    let query = params.get("from");
    let data;
    if (query === "home") {
      data = homeCourses && homeCourses.filter((d) => d.id == match.params.id);
    } else {
      data = courses && courses.filter((d) => d.id == match.params.id);
    }
    return (
      <>
        {data[0] ? (
          <div class="course">
            {/* <RegClassRepresenter show={showClassRepresenterModal} close={() => this.hideModal()} id={match.params.id} isLoggedIn={isLoggedIn} roles={roles}/> */}
            {showChapterModal && (
              <RegChapter
                show={showChapterModal}
                sessionId={session}
                close={() => this.hideModal()}
                id={match.params.id}
                editChapterData={editChapterData}
              />
            )}
            {showClassworkModal && (
              <RegClasswork
                show={showClassworkModal}
                close={() => this.hideModal()}
                id={match.params.id}
                editClassworkData={editClassworkData}
              />
            )}
            {showSessionModal && (
              <RegSession
                show={showSessionModal}
                close={() => this.hideModal()}
                id={match.params.id}
                department={data[0].department.department_name}
                course_name={data[0].course_name}
                course_code={data[0].course_code}
                editSessionData={editSessionData}
              />
            )}
            <div class="jumbotron jumbotron-fluid pt-16 pb-24">
              <div class="container">
                <div class="row">
                  <div class="col col-sm-8">
                    <h1 class="display-4">{data[0].course_name}</h1>
                    <h6 class="mb-8">
                      {data[0].faculty.faculty_name} -{" "}
                      {data[0].department.department_name}
                    </h6>
                    <h6 class="mb-8">
                      Lecture{" "}
                      <span>
                        {data[0].user.firstName} {data[0].user.lastName}
                      </span>
                    </h6>
                    <h6 class="mb-8">
                      Class representer{" "}
                      {data[0].class_representer_name ? (
                        <>
                          <span>{data[0].class_representer_name}</span>
                        </>
                      ) : (
                        <span onClick={() => this.openClassRepresenterModal()}>
                          add class representer
                        </span>
                      )}
                    </h6>
                    <h6 class="mb-8">
                      notes{" "}
                      {data[0].course_file && (
                        <span>{data[0].course_file}</span>
                      )}{" "}
                      <i
                        className="fa fa-download"
                        onClick={() => this.downloadFile(data[0].id)}
                      ></i>
                    </h6>
                    <ul class="mb-0">
                      <li>{data[0].semester && data[0].semester.title}</li>
                      <li>
                        <span class="badge badge-warning">
                          {data[0].course_credits} Credits
                        </span>
                      </li>
                      <li>
                        <i class="fa fa-code-fork mr-8"></i>
                        {data[0].course_code}
                      </li>
                    </ul>
                  </div>
                  <div class="col col-sm-4">
                    {isLoggedIn === "TEACHER" && (
                      <>
                        <div className="form-group col-md-6">
                          <label className="text-white">Select File :</label>
                          <input
                            type="file"
                            className="form-control"
                            name="course_file"
                            onChange={(event) =>
                              this.fileUploadInputChange(event)
                            }
                          />
                        </div>
                        <button
                          type="submit"
                          className="btn btn-primary btn-sm"
                          onClick={() => this.uploadCourseFileFunc(data[0].id)}
                        >
                          Save
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <section class="container">
              <div class="row">
                <div class="col col-sm-7 pr-16 pl-0">
                  <div class="hk-sec-wrapper chapter-section pa-0 shadow-none">
                    <div class="pl-16 pt-16 pb-16 pr-16 mb-8 chapter-head d-flex justify-content-between">
                      <h5 class="hk-sec-title mb-0">Chapters</h5>
                    </div>

                    <ul class="list-group mb-8">
                      {data[0].session_list.map((d, index) => (
                        <li
                          class="
                        list-group-item
                        border-0
                      "
                        >
                          <div class="list-title-section">
                            {isLoggedIn === "CLASS_REPRESENTER" ? (
                              <>
                                {index !== 0 &&
                                data[0].session_list[this.indexes(index)]
                                  .isFinished !== true ? null : (
                                  <input
                                    type="checkbox"
                                    checked={d.isFinished}
                                    onChange={() =>
                                      this.isSessionFinished(
                                        d.isFinished,
                                        match.params.id,
                                        d.id
                                      )
                                    }
                                  />
                                )}
                              </>
                            ) : (
                              <input type="checkbox" checked={d.isFinished} />
                            )}
                            <i class="fa fa-file mr-8 ml-16"></i>
                            <h6 class="mb-0 mr-2">{d.title}</h6>
                            <div className="mr-1">
                              <EditBtn
                                func={() => this.updateSessionHandler(d)}
                              />
                            </div>
                            <div>
                              <DeleteBtn
                                func={() =>
                                  this.deleteSessionHandler(
                                    match.params.id,
                                    d.id
                                  )
                                }
                              />
                            </div>
                          </div>
                          <ul className="pl-16">
                            {d.chapter_list.map((el) => (
                              <li
                                class="list-group-item
                        d-flex
                        justify-content-start
                        align-items-center
                        border-0"
                              >
                                {/* <input
                      type="checkbox"
                      checked={el.isFinished}
                      onChange={() => this.isChapterFinished({
                        chapterId: el.id,
                        sessionId: d.id,
                        courseId: match.params.id
                       }, d.isFinished)}
                      /> */}
                                <div>
                                  <h6>{el.title}</h6>
                                  <ol
                                    className="ml-3"
                                    style={{ lineHeight: 2 }}
                                  >
                                    {el.text &&
                                      el.text
                                        .split(",")
                                        .map((t) => <li>{t}</li>)}
                                  </ol>
                                  <div className="d-flex mt-2">
                                    <div className="mr-1">
                                      <EditBtn
                                        func={() =>
                                          this.updateChapterHandler(d.id, el)
                                        }
                                      />
                                    </div>
                                    <div>
                                      <DeleteBtn
                                        func={() =>
                                          this.deleteChapterHandler(
                                            match.params.id,
                                            d.id,
                                            el.id
                                          )
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                            <li
                              class="list-group-item
                        d-flex
                        justify-content-start
                        align-items-center
                        border-0"
                            >
                              {isLoggedIn === "TEACHER" &&
                                d.chapter_list.length <= 0 && (
                                  <button
                                    class="btn btn-secondary btn-sm"
                                    onClick={(event) =>
                                      this.openChapterModal(d.id, event)
                                    }
                                  >
                                    Add New Chapter
                                  </button>
                                )}
                            </li>
                          </ul>
                        </li>
                      ))}
                      <li
                        class="
                        list-group-item
                        border-0
                      "
                      >
                        {isLoggedIn === "TEACHER" && (
                          <>
                            {data[0].session_list.length <= 15 && (
                              <button
                                class="btn btn-secondary btn-sm"
                                onClick={(event) =>
                                  this.openSessionModal(event)
                                }
                              >
                                Add New Week
                              </button>
                            )}
                          </>
                        )}
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="col col-sm-5 pr-16 pl-0">
                  <div class="hk-sec-wrapper chapter-section pa-0 shadow-none border-0">
                    <div class="pl-16 pt-16 pb-16 pr-16 mb-8 chapter-head d-flex justify-content-between border-0">
                      <h5 class="hk-sec-title mb-0">Activities</h5>
                    </div>

                    <ul class="list-group mb-8">
                      {data[0].classwork_list.map((c) => (
                        <li
                          class="
                      list-group-item
                      d-flex
                      justify-content-between
                      align-items-center
                      border-0
                    "
                        >
                          <div class="media">
                            <div class="media-body d-flex align-items-center">
                              <div className="mr-2">
                                <span class="badge badge-primary mr-8">1</span>
                                <span>
                                  <span class="font-weight-500 text-dark text-capitalize">
                                    {c.type}
                                  </span>
                                </span>
                                <span className="pl-8">{c.date}</span>
                              </div>
                              <div className="mr-1">
                                <EditBtn
                                  func={() => this.updateClassworkHandler(c)}
                                />
                              </div>
                              <div>
                                <DeleteBtn
                                  func={() =>
                                    this.deleteClassworkHandler(
                                      match.params.id,
                                      c.id
                                    )
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                      <li
                        class="
                        list-group-item
                        d-flex
                        justify-content-between
                        align-items-center
                        border-0
                      "
                      >
                        {isLoggedIn === "TEACHER" && (
                          <button
                            class="btn btn-secondary btn-sm"
                            onClick={() => this.openClassworkModal()}
                          >
                            Add Quiz
                          </button>
                        )}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </div>
        ) : null}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    courses: state.course.data,
    isLoggedIn: state.auth.isLoggedIn,
    roles: state.role.data,
    homeCourses: state.course.homeCourses,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetRoles: () => dispatch(actions.getRoles()),
    onGetCourses: () => dispatch(actions.getCourses()),
    onGetCoursesByStatus: (id) => dispatch(actions.getCoursesByStatus(id)),
    onUploadFile: (id, data) => dispatch(actions.uploadCourseFile(id, data)),
    onDownloadFile: (id) => dispatch(actions.downloadFile(id)),
    onTickSession: (data, id, sessionId) =>
      dispatch(actions.updateSession(data, id, sessionId)),
    onUpdateChapter: (ids, data) => dispatch(actions.updateChapter(ids, data)),
    onDeleteChapter: (id, sessionId, chapterId) =>
      dispatch(actions.deleteChapter(id, sessionId, chapterId)),
    onDeleteSession: (id, sessionId) =>
      dispatch(actions.deleteSession(id, sessionId)),
    onDeleteClasswork: (id, classworkId) =>
      dispatch(actions.deleteClasswork(id, classworkId)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Detail));
