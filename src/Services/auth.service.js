import UserService from "./user.service";

const subscribers = [];

class AuthService {
  subscribeOnUpdate(callback) {
    subscribers.push(callback);
  }

  login(email, password) {
    return UserService.login(email, password)
      .then((response) => {
        if (response.data.token) {
          let userData = response.data;

          localStorage.setItem("user", JSON.stringify(userData));

          subscribers.forEach((item) => {
            item(userData);
          });
        }
      })
      .catch((error) => {
        alert(error);
        console.log(error);
      });
  }

  logout() {
    localStorage.removeItem("user");
    subscribers.forEach((callback) => {
      callback(null);
    });
  }

  signup(email, password) {
    return UserService.signup(email, password)
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));

          subscribers.forEach((callback) => {
            callback(response.data);
          });
        }
      })
      .catch((error) => {
        alert(error);
        console.log(error);
      });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  updateUserDetails() {
    UserService.details().then((response) => {
      let newUserDetails = response.data;
      var user = JSON.parse(localStorage.getItem("user"));
      user.userDetails = newUserDetails;

      localStorage.setItem("user", JSON.stringify(user));

      subscribers.forEach((item) => {
        item(newUserDetails);
      });
    });
  }

  updateUserInternal(newUserDetails) {
    var user = JSON.parse(localStorage.getItem("user"));
    user.userDetails = newUserDetails;

    localStorage.setItem("user", JSON.stringify(user));
  }

  isAuthenticated() {
    return localStorage.getItem("user") !== null;
  }
}

export default new AuthService();
