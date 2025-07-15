import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Chat from "../pages/Chat";
import ChatBox from "../components/ChatBox";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Profile from "../pages/Profile";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
      <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
            <Route path="/chat/:selectedUserId" element={<ChatBox />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
    </Routes>
  );
}
