import baseUrl from "../Utils/baseUrl";

class RoleDataService {
  getAll() {
    return baseUrl.get("/user_role/", {
      headers: {
        // Authorization: `Bearer ${localStorage.getItem("token1")}`,
      },
    });
  }

  addOne(data) {
    return baseUrl.post("/user_role/", data, {
      headers: {
        "Content-type": "application/json",
        // Authorization: `Bearer ${localStorage.getItem("token1")}`,
      },
    });
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

export default new RoleDataService();
