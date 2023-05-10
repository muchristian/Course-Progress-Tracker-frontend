import baseUrl from "../Utils/baseUrl";

class ChapterDataService {
  getAll() {
    return baseUrl.get("/chapter/all/", {
      headers: {
        // Authorization: `Bearer ${localStorage.getItem("token1")}`,
      },
    });
  }

  addChapter(data) {
    return baseUrl.post("/chapter/", data, {
      headers: {
        "Content-type": "application/json",
        // Authorization: `Bearer ${localStorage.getItem("token1")}`,
      },
    });
  }
  updChapter(id, data) {
    return baseUrl.put(`/chapter/update/${id}`, data, {
      headers: {
        "Content-type": "application/json",
        // Authorization: `Bearer ${localStorage.getItem("token1")}`,
      },
    });
  }

  chapterChck(data, id) {
    return baseUrl.put(`/chapter/check/${id}`, data, {
      headers: {
        "Content-type": "application/json",
        // Authorization: `Bearer ${localStorage.getItem("token1")}`,
      },
    });
  }

  delChapter(id) {
    return baseUrl.delete(`/chapter/delete/${id}`, {});
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

export default new ChapterDataService();
