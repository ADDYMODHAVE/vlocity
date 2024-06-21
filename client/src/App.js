// client/src/App.js
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PollList from "./components/PollList";
import CreatePoll from "./pages/CreatePoll";
import PollPage from "./pages/PollPage";
import UserLogin from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
  let login = localStorage.getItem("token");
  return (
    <BrowserRouter>
      <Routes>
        {!login && <Route path="/" element={<UserLogin />} />}
        {login && <Route path="/" element={<ProfilePage />} />}
        {login && <Route path="/polls" element={<PollList />} />}
        {login && <Route path="/create" element={<CreatePoll />} />}
        {login && <Route path="/polls/:pollId" element={<PollPage />} />}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
