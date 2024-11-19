import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.tsx'; // Componente de login
import Admin from './Admin.tsx'; // Componente de dashboard

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
