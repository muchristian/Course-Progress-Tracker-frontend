import baseUrl from "../Utils/baseUrl";

class DepartmentDataService {
  getAll() {
    return baseUrl.get("/department/", {
      headers: {
        // Authorization: `Bearer ${localStorage.getItem("token1")}`,
      },
    });
  }

  addOne(data) {
    return baseUrl.post("/department", data, {
      headers: {
        "Content-type": "application/json",
        // Authorization: `Bearer ${localStorage.getItem("token1")}`,
      },
    });
  }

  update(data, id) {
    return baseUrl.put(`/department/update/${id}`, data);
  }

  delete(id) {
    return baseUrl.delete(`/department/delete/${id}`);
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

export default new DepartmentDataService();
