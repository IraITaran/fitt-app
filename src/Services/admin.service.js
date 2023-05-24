import axios from "axios";
import authHeader from "./auth-header";

const UserAPI_URL = "https://fitt.mom/admin/user";
const BotAPI_URL = "https://fitt.mom/admin/bot";
const LeaderAPI_URL = "https://fitt.mom/admin/leader";
const PaymentAPI_URL = "https://fitt.mom/admin/payment";

class AdminService {
  getAllUsers() {
    return axios.get(UserAPI_URL, { headers: authHeader() });
  }

  deleteUser(userId) {
    return axios.delete(UserAPI_URL + "/" + userId, { headers: authHeader() });
  }

  getAllBots() {
    return axios.get(BotAPI_URL, { headers: authHeader() });
  }

  deleteBot(botId) {
    return axios.delete(BotAPI_URL + "/" + botId, { headers: authHeader() });
  }

  getAllLeaders() {
    return axios.get(LeaderAPI_URL, { headers: authHeader() });
  }

  deleteLeader(leaderId) {
    return axios.delete(LeaderAPI_URL + "/" + leaderId, {
      headers: authHeader(),
    });
  }

  deleteLeaderPositions(leaderId) {
    return axios.delete(LeaderAPI_URL + "/positions/" + leaderId, {
      headers: authHeader(),
    });
  }

  deleteLeaderFailedPositions(leaderId) {
    return axios.delete(LeaderAPI_URL + "/failedpositions/" + leaderId, {
      headers: authHeader(),
    });
  }

  getAllPayment() {
    return axios.get(PaymentAPI_URL, { headers: authHeader() });
  }

  deletePayment(paymentId) {
    return axios.delete(PaymentAPI_URL + "/" + paymentId, {
      headers: authHeader(),
    });
  }
}

export default new AdminService();
