import axios from "axios";
import authHeader from "./auth-header";

const USERAPI_URL = "https://fitt.ink/admin/user";
const BOTAPI_URL = "https://fitt.ink/admin/bot";
const LEADERAPI_URL = "https://fitt.ink/admin/leader";

class AdminService {
  getAllUsers() {
    return axios.get(USERAPI_URL, { headers: authHeader() });
  }

  deleteUser(userId) {
    return axios.delete(USERAPI_URL + "/" + userId, { headers: authHeader() });
  }

  getAllBots() {
    return axios.get(BOTAPI_URL, { headers: authHeader() });
  }

  deleteBot(botId) {
    return axios.delete(BOTAPI_URL + "/" + botId, { headers: authHeader() });
  }

  getAllLeaders() {
    return axios.get(LEADERAPI_URL, { headers: authHeader() });
  }

  deleteLeader(leaderId) {
    return axios.delete(LEADERAPI_URL + "/" + leaderId, {
      headers: authHeader(),
    });
  }

  deleteLeaderPositions(leaderId) {
    return axios.delete(LEADERAPI_URL + "/positions/" + leaderId, {
      headers: authHeader(),
    });
  }

  deleteLeaderFailedPositions(leaderId) {
    return axios.delete(LEADERAPI_URL + "/failedpositions/" + leaderId, {
      headers: authHeader(),
    });
  }
}

export default new AdminService();
