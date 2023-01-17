import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import HomePage from "./pages/HomePage";
import IncomePage from "./pages/IncomePage";
import ExpensePage from "./pages/ExpensePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/cadastro" element={<RegistrationPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/nova-entrada" element={<IncomePage />} />
        <Route path="/nova-saida" element={<ExpensePage/>} />
      </Routes>
    </BrowserRouter>
  );
}