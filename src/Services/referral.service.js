import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://fitt.mom/api/referral";

class ReferralService {
  getAll() {
    return axios.get(API_URL, {
      headers: authHeader(),
    });
  }
}

export default new ReferralService();
