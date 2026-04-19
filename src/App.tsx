import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import EmailVerification from './pages/EmailVerification';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Definimos os caminhos para cada tela */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-email" element={<EmailVerification />} />
      </Routes>
    </BrowserRouter>
  );
}