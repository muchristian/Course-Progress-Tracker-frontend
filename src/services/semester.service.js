import baseUrl from "../Utils/baseUrl";

class SemesterDataService {
  getAll() {
    return baseUrl.get("/semester/all/", {
      headers: {},
    });
  }

  addSemester(data) {
    return baseUrl.post("/semester/", data, {
      headers: {
        "Content-type": "application/json",
      },
    });
  }

  updSemester(id, data) {
    return baseUrl.put(`/semester/update/${id}`, data);
  }
}

export default new SemesterDataService();
