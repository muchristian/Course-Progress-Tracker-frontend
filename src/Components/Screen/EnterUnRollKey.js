import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../../store/action";
import { Redirect } from "react-router-dom"

class EnterUnRollKey extends Component {
    state = {
        enroll_key: "",
    }
    onChangeUnroll(e) {
        this.setState({ enroll_key: e.target.value })
      }
     onSubmit(e) {
        const { enroll_key } = this.state
        this.props.onGetCourse(enroll_key)
     }
    render() {
        const { show, close, course } = this.props
        const { enroll_key } = this.state
        if (course && course.length > 0) {
            return <Redirect to={`/course-detail/${course[0].id}?from=home`}  />
        }
        const styles = show ? {paddingRight: '17px', display: 'block'} : {}
        return (
            <div class={`modal fade ${show ? 'show' : ""}`} id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-modal="true" style={styles}>
                                        <div class="modal-dialog" role="document">
                                            <form class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="exampleModalLabel">Enter Unrollment Key</h5>
                                                    <button type="button" class="close" onClick={close} data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">×</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                    <div class="form-group row">
                                                      <div class="col-md-4 pr-8 pl-8">
                                                      <input type="text" class="form-control" value={enroll_key} placeholder="unroll key" onChange={(e) => this.onChangeUnroll(e)}/>
                                                      </div>
                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={close}>Cancel</button>
                                                    <button type="button" class="btn btn-primary" onClick={(e) => this.onSubmit(e)}>Submit</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        course: state.course.course
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      onGetCourse: (key) => dispatch(actions.onGetCourseByUnrollKey(key))
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(EnterUnRollKey);