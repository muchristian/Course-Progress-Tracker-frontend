import baseUrl from "../Utils/baseUrl";

class EventDataService {
  getAll() {
    return baseUrl.get("/events", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token1")}`,
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

export default new EventDataService();
