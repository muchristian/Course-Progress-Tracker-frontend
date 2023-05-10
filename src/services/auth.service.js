import baseUrl from "../Utils/baseUrl";

class AuthDataService {
  // getAll() {
  //   return baseUrl.get("/tutorials");
  // }

  // get(id) {
  //   return http.get(`/tutorials/${id}`);
  // }

  getAll() {
    return baseUrl.get("/users/all/");
  }
  getProfile(token) {
    return baseUrl.get("/users/profile/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  login(data) {
    return baseUrl.post("/users/login/", data, {
      headers: {
        "Content-type": "application/json",
      },
    });
  }

  register(data) {
    return baseUrl.post("/users/signup/", data, {
      headers: {
        "Content-type": "application/json",
      },
    });
  }

  delete(id) {
    return baseUrl.delete(`/users/delete/${id}`);
  }

  forgotPassword(data) {
    return baseUrl.post("/auth/forgot-password", data, {
      headers: {
        "Content-type": "application/json",
      },
    });
  }

  resetPassword(data) {
    return baseUrl.post("/auth/reset-password", data, {
      headers: {
        "Content-type": "application/json",
      },
    });
  }
  update(data, id) {
    return baseUrl.put(`/users/update/${id}`, data);
  }

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

export default new AuthDataService();
