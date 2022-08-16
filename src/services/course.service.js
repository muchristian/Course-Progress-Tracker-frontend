import baseUrl from "../Utils/baseUrl";

class CourseDataService {
  getAll() {
    return baseUrl.get("/course/all/", {
      headers: {
        // Authorization: `Bearer ${localStorage.getItem("token1")}`,
      },
    });
  }

  getReport(data) {
    return baseUrl.get(`/course/report?department=${data.name}&id=${data.id}`, {
      headers: {
        // Authorization: `Bearer ${localStorage.getItem("token1")}`,
      },
    });
  }

  getOne(id) {
    return baseUrl.get(`/course/${id}`, {});
  }

  download(id) {
    return baseUrl.get(`/course/download/${id}`, {
      responseType: "blob",
    });
  }

  getAllById(id) {
    return baseUrl.get(`/course/all/${id}`, {});
  }

  getAllByRId(id) {
    return baseUrl.get(`/course/representer/${id}`, {});
  }

  getAllByStatus(id) {
    return baseUrl.get(`/course/statuses/${id}`, {});
  }

  getCourseStatus() {
    return baseUrl.get("/course-status/", {});
  }

  addOne(data) {
    return baseUrl.post("/course/", data, {
      headers: {
        "Content-type": "application/json",
        // Authorization: `Bearer ${localStorage.getItem("token1")}`,
      },
    });
  }

  update(id, data) {
    return baseUrl.put(`/course/update/${id}`, data);
  }

  delete(id) {
    return baseUrl.delete(`/course/delete/${id}`);
  }

  // get(id) {
  //   return http.get(`/tutorials/${id}`);
  // }

  // update(id, data) {
  //   return http.put(`/tutorials/${id}`, data);
  // }

  // delete(id) {
  //   return http.delete(`/tutorials/${id}`);
  // }

  // deleteAll() {
  //   return http.delete(`/tutorials`);
  // }

  // findByTitle(title) {
  //   return http.get(`/tutorials?title=${title}`);
  // }
}

export default new CourseDataService();
