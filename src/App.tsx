
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard'; 
import SignInPage from './pages/SignIn';
import SignUpPage from './pages/SignUp';
import DeskTopPage from './pages/DeskTop';
import SmartPhonePage from './pages/SmartPhone';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} /> 
        <Route path="/smartphone" element={<SmartPhonePage />} /> 
        <Route path="/desktop" element={<DeskTopPage />} /> 
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Routes>
    </Router>
  );
}
