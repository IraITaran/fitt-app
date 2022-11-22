import "bootstrap/dist/css/bootstrap.min.css";
import LeaderBoard from "./Components/LeaderBoard/LeaderBoard";
import PageHeader from "./Components/PageHeader/PageHeader";
import PageFooter from "./Components/PageFooter/PageFooter";

function App() {
  return (
    <div className="App">
      <div className="container-fluid p-0">
        <PageHeader />
        <LeaderBoard />
        <PageFooter />
      </div>
    </div>
  );
}

export default App;
