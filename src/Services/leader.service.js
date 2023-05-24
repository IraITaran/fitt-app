import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://fitt.mom/api/leader";

class LeaderService {
  getPositions(leaderId) {
    return axios.get(API_URL + "/positions/" + leaderId, {
      headers: authHeader(),
    });
  }

  getLeaders() {
    return axios.get(API_URL + "/", {
      headers: authHeader(),
    });
  }
}

export default new LeaderService();
