import "bootstrap/dist/css/bootstrap.min.css";
import LeaderBoard from "./Components/LeaderBoard/LeaderBoard";
import PageHeader from "./Components/PageHeader/PageHeader";
import PageFooter from "./Components/PageFooter/PageFooter";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TarrifPlans from "./Pages/TarrifPlans/TarrifPlans";
import About from "./Pages/About";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import ConfirmEmail from "./Pages/ConfirmEmail/ConfirmEmail";
import Leader from "./Pages/Leader/Leader";
import AccountRoutes from "./Pages/Account/AccountRoutes";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="container-fluid p-0">
          <PageHeader />
          <Routes>
            <Route path="/" element={<LeaderBoard />} />
            <Route path="/about" element={<About />} />
            <Route path="/tarrifs" element={<TarrifPlans />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/confirm-email" element={<ConfirmEmail />} />
            <Route path="/leader/:leaderId" element={<Leader />} />
            <Route path="/account/*" element={<AccountRoutes />} />
          </Routes>
          <PageFooter />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
