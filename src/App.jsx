//React
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
//Pages
import { Home } from "./pages/Home";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Profile } from "./pages/Profile";
import { Game } from "./pages/Game";
// Components
import { Header } from "./components/header/Header";

function App() {
  const [users, setUsers] = useState([
    { id: 0, email: "admin@admin.com", password: "admin" },
  ]);
  const [loggedIn, setLoggedIn] = useState({ loggedIn: false, id: null });
  return (
    <>
      <Header state={loggedIn} setState={setLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup setState={setUsers} />} />
        <Route
          path="/signin"
          element={
            <Signin data={users} setState={setLoggedIn} state={loggedIn} />
          }
        />
        <Route path="/profile" element={<Profile data={loggedIn} />} />
        <Route path="/game" element={<Game data={loggedIn} />} />
      </Routes>
    </>
  );
}

export default App;
