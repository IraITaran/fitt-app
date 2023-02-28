import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://fitt.ink/api/user";

class UserService {
  getPublicContent() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  login(email, password) {
    return axios.post(API_URL + "/login", { email, password });
  }

  signup(email, password) {
    return axios.post(API_URL + "/signup", { email, password });
  }

  confirmEmail(code) {
    return axios.put(
      API_URL + "/confirm-email/" + code,
      {},
      {
        headers: authHeader(),
      }
    );
  }

  sendEmailVerificationCode() {
    return axios.post(
      API_URL + "/confirm-email",
      {},
      {
        headers: authHeader(),
      }
    );
  }

  details() {
    return axios.get(API_URL + "/details", { headers: authHeader() });
  }

  sessions() {
    return axios.get(API_URL + "/getlogs", { headers: authHeader() });
  }

  updateApiKey(key, secret) {
    return axios.post(
      API_URL + "/exchange",
      { key: key, secret: secret },
      { headers: authHeader() }
    );
  }

  requestTelegramCode() {
    return axios.put(
      API_URL + "/requestTelegramCode",
      {},
      { headers: authHeader() }
    );
  }

  getApiKeys() {
    return axios.get(API_URL + "/apikey", { headers: authHeader() });
  }
}

export default new UserService();
