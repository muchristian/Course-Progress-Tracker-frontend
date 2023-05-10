import baseUrl from "../Utils/baseUrl";

class AttendanceDataService {
  getAll() {
    return baseUrl.get("/attendance/all/", {
      headers: {
        // Authorization: `Bearer ${localStorage.getItem("token1")}`,
      },
    });
  }

  addOne(data) {
    return baseUrl.post("/attendance/", data, {
      headers: {
        "Content-type": "application/json",
        // Authorization: `Bearer ${localStorage.getItem("token1")}`,
      },
    });
  }

  updClasswork(id, data) {
    return baseUrl.put(`/classwork/update/${id}`, data);
  }

  delClasswork(id) {
    return baseUrl.delete(`/classwork/delete/${id}`);
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

export default new AttendanceDataService();
