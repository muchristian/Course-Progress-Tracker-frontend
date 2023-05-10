import baseUrl from "../Utils/baseUrl";

class ClassworkDataService {
  getAll() {
    return baseUrl.get("/classwork/all/", {
      headers: {
      },
    });
  }

  addClasswork(data) {
    return baseUrl.post("/classwork/", data, {
      headers: {
        "Content-type": "application/json",
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

export default new ClassworkDataService();
