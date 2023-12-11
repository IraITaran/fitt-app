import "bootstrap/dist/css/bootstrap.min.css";
import LeaderBoard from "./Components/LeaderBoard/LeaderBoard";
import PageHeader from "./Components/PageHeader/PageHeader";
import PageFooter from "./Components/PageFooter/PageFooter";
import { HashRouter, Routes, Route } from "react-router-dom";
import TarrifPlans from "./Pages/TarrifPlans/TarrifPlans";
import About from "./Pages/About/About";
import Login from "./Pages/Login/Login";
import SignupSteps from "./Pages/SignupSteps/SignupSteps";
import Signup from "./Pages/Signup/Signup";
import Payment from "./Pages/Payment/Payment";
import ConfirmEmail from "./Pages/ConfirmEmail/ConfirmEmail";
import Leader from "./Pages/Leader/Leader";
import AccountRoutes from "./Pages/Account/AccountRoutes";
import AdminRoutes from "./Pages/Admin/AdminRoutes";
import MultistepFollow from "./Pages/MultistepFollow/MultistepFollow";
import axios from "axios";
import AuthService from "./Services/auth.service";
import QuestionsRoute from "./Pages/Questions/QuestionsRoute";
import GoogleAuth from "./Pages/GoogleAuth/GoogleAuth";
import ModalSignUp from "./Pages/SignupModal/SignupModal";

import "./App.css";

function App() {

  return (
    <HashRouter>
      <div className="App">
        <div className="container-fluid p-0">
          <PageHeader />
          <Routes>
            <Route path="/" element={<LeaderBoard />} />
            <Route path="/about" element={<About />} />
            <Route path="/tarrifs" element={<TarrifPlans isFrequentQuestions={true}/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignupSteps />} />
            <Route path="/confirm-email" element={<ConfirmEmail />} />
            <Route path="/leader/:leaderId" element={<Leader />} />
            <Route path="/account/*" element={<AccountRoutes />} />
            <Route path="/admin/*" element={<AdminRoutes />} />
            <Route path="/payment/:subscriptionType" element={<Payment />} />
            <Route path="/follow/:leaderId" element={<MultistepFollow />} />
            <Route path="/questions/*" element={<QuestionsRoute />} />
            <Route path="/googleAuth/*" element={<GoogleAuth />} />
           
          </Routes>
          <ModalSignUp />
          <PageFooter />
          
          
        </div>
      </div>
    </HashRouter>

    
  );
}

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    // if (error.response.status === 302) {
    //   console.log(error);
    // }
    if (error.response.status === 401) {
      AuthService.logout();
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default App;
