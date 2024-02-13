import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateTask from "./pages/CreateTask";
import Meeter from "./pages/Meeter";
import ViewTask from "./pages/ViewTask";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoute onlyLogged={true} />}>
          <Route path="/home" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/createTask" element={<CreateTask />} />
          <Route path="/meeter" element={<Meeter />} />
          <Route path="/viewTask" element={<ViewTask />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
