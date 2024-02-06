import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import ChatEjemplo from "./pages/chatEjemplo/ChatEjemplo";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat-ejemplo/:username" element={<ChatEjemplo />} />
      </Routes>
    </Router>
  );
}

export default App;
