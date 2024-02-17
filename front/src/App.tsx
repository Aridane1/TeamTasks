import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import PrivateRoute from "./utils/PrivateRoute";
import Register from "./pages/Register";
import ViewTask from "./pages/ViewTask";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoute onlyLogged={true} />}>
          <Route path="/home" element={<Home />} />
          <Route path="/viewTask" element={<ViewTask />} />
        </Route>
      </Routes>
    </Router>
  );
}
