import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateTask from "./pages/CreateTask";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/chat" element={<Chat/>} />
        <Route path="/settings" element={<Settings/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/createTask" element={<CreateTask/>} />
      </Routes>
    </Router>
  );
}

export default App;
