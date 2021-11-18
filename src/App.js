import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Auth from "./components/Auth";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/auth/log" element={<Auth hasAccount={false}/>} />
        <Route exact path="/auth/sign" element={<Auth hasAccount={true}/>} />
      </Routes>
  </BrowserRouter>
  );
}

export default App;
