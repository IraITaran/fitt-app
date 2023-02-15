import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://fitt.ink/api/payment";

class PaymentService {
  getInvoice() {
    return axios.get(API_URL + "/invoice", {
      headers: authHeader(),
    });
  }
}

export default new PaymentService();
