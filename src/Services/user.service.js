import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://fitt.mom/api/user";

class UserService {
  getPublicContent() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  login(email, password) {
    return axios.post(API_URL + "/login", { email, password });
  }

  signup(email, password, refCode) {
    return axios.post(API_URL + "/signup", { email, password, refCode });
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

  detailsByAccount(id) {
    return axios.get(API_URL + "/details-account/" + id, {
      headers: authHeader(),
    });
  }

  sessions() {
    return axios.get(API_URL + "/getlogs", { headers: authHeader() });
  }

  updateApiKey(name, key, secret, exchange) {
    return axios.post(
      API_URL + "/exchange",
      { name: name, key: key, secret: secret, exchange: exchange },
      { headers: authHeader() }
    );
  }

  deleteApiKey(id) {
    return axios.delete(API_URL + "/exchange/" + id, { headers: authHeader() });
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

  getReferralBonus(from, to) {
    return axios.post(
      API_URL + "/refbonus",
      { from: from, to: to },
      {
        headers: authHeader(),
      }
    );
  }

  changeAccount(id) {
    return axios.post(
      API_URL + "/account/" + id,
      {},
      { headers: authHeader() }
    );
  }

  positions() {
    return axios.get(API_URL + "/positions", { headers: authHeader() });
  }

  closePosition(symbol) {
    return axios.put(API_URL + "/exchange/close-position/" + symbol, {}, { headers: authHeader() });
  }
}

export default new UserService();
