import axios from "axios";
import authHeader from "./auth-header";

const USERAPI_URL = "https://fitt.ink/admin/user";
const BOTAPI_URL = "https://fitt.ink/admin/bot";

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
}

export default new AdminService();
