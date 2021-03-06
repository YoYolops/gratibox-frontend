import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Auth from "./components/Auth";
import { UserProvider } from "./components/context/UserContext";
import Plans from "./components/Plans";
import LoadingScreen from "./components/LoadingPage";
import Subscribe from "./components/Subscribe";
import UserSignature from "./components/UserSignatures";

function App() {

  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/auth/log" element={<Auth hasAccount={true}/>} />
          <Route exact path="/auth/sign" element={<Auth hasAccount={false}/>} />
          <Route exact path="/plans" element={<Plans />} />
          <Route path="/subscribe/:type" element={<Subscribe />}/>
          <Route exact path="/signatures/" element={<UserSignature />} />
          <Route exact path="/loading" element={<LoadingScreen />} />
        </Routes>
      </UserProvider>
  </BrowserRouter>
  );
}

export default App;
