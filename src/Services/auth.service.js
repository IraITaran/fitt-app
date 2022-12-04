import axios from "axios";

const API_URL = "https://fitt.ink/api/user/";
const subscribers = [];

class AuthService {
  subscribeOnUpdate(callback) {
    subscribers.push(callback);
  }

  login(email, password) {
    return axios
      .post(API_URL + "login", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));

          subscribers.forEach((callback) => {
            callback(response.data);
          });
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
    subscribers.forEach((callback) => {
      callback(null);
    });
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
