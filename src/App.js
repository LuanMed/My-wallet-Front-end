import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import HomePage from "./pages/HomePage";
import IncomePage from "./pages/IncomePage";
import ExpensePage from "./pages/ExpensePage";
import { useState } from "react";
import { UserInfoContext } from "./context/UserInfoContext";
export default function App() {
  const [userInfo, setUserInfo] = useState({});
  const id = useParams();

  return (
    <BrowserRouter>
      <UserInfoContext.Provider value={[userInfo, setUserInfo]}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/cadastro" element={<RegistrationPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/nova-entrada" element={<IncomePage />} />
          <Route path="/nova-saida" element={<ExpensePage />} />
        </Routes>
      </UserInfoContext.Provider>
    </BrowserRouter>
  );
}