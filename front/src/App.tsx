import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import PrivateRoute from "./utils/PrivateRoute";
import Register from "./pages/Register";
import CreateTask from "./pages/CreateTask";
import ViewTask from "./pages/ViewTask";
import Setting from "./pages/Setting";
import ChatFeed from "./pages/ChatFeed";
import Chat from "./pages/Chat";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/createTask" element={<CreateTask/>}/>
        <Route element={<PrivateRoute onlyLogged={true} />}>
          <Route path="/home" element={<Home />} />
          <Route path="/settings" element={<Setting />} />
          <Route path="/viewTask" element={<ViewTask />} />
          <Route path="/chatFeed" element={<ChatFeed />} />
          <Route path="/chat/:taskId" element={<Chat />} />
        </Route>
      </Routes>
    </Router>
  );
}
