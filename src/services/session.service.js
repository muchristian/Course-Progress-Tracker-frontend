import baseUrl from "../Utils/baseUrl";

class SessionDataService {
  getAll() {
    return baseUrl.get("/session/all/", {
      headers: {
      },
    });
  }

  addSession(data) {
    return baseUrl.post("/session/", data, {
      headers: {
        "Content-type": "application/json",
      },
    });
  }

  updSession(id, data) {
    return baseUrl.put(`/session/update/${id}`, data);
  }

  delSession(id) {
    return baseUrl.delete(`/session/delete/${id}`);
  }
}

export default new SessionDataService();
