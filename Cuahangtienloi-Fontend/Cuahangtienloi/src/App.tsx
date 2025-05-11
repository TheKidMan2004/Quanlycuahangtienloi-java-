// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import AdminPage from "./components/AdminPage"; // đúng tên file mới

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/*" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;