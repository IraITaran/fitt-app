import "bootstrap/dist/css/bootstrap.min.css";
import LeaderBoard from "./Components/LeaderBoard/LeaderBoard";
import PageHeader from "./Components/PageHeader/PageHeader";
import PageFooter from "./Components/PageFooter/PageFooter";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TarrifPlans from "./Pages/TarrifPlans/TarrifPlans";
import About from "./Pages/About";
import Authorization from "./Pages/Authorization/Authorization";
import Registration from "./Pages/Registration/Registration";

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
            <Route path="/authorization" element={<Authorization />} />
            <Route path="/registration" element={<Registration />} />
          </Routes>
          <PageFooter />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
