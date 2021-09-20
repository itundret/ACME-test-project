import http from "../http-common";
import ACMEData from "../types/data.type"

class ACMEDataService {
  getAll() {
    return http.get("/list");
  }

  get(id: string) {
    return http.get(`/team_list/NFL.JSON?api_key=${id}`);
  }

  create(data: ACMEData) {
    return http.post("/list", data);
  }

  update(data: ACMEData, id: any) {
    return http.put(`/list/${id}`, data);
  }

  delete(id: any) {
    return http.delete(`/list/${id}`);
  }

  deleteAll() {
    return http.delete(`/list`);
  }

  findByTitle(title: string) {
    return http.get(`/list?title=${title}`);
  }
}

export default new ACMEDataService();