import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import MainPage from "../pages/main";

function App() {
  return (
    <div className="App">
      <header>
        <h1>Aircraft Scheduling</h1>
      </header>
      <MainPage />
    </div>
  );
}

export default App;
