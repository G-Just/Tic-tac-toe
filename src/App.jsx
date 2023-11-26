//React
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
//Pages
import { Home } from "./pages/Home";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Signout } from "./pages/Signout";
import { Profile } from "./pages/Profile";
import { GamePage } from "./pages/GamePage";
import { FailedPage } from "./pages/Failed";
// Components
import { Header } from "./components/header/Header";
import { NewHeader } from "./components/header/NewHeader";

function App() {
  const [users, setUsers] = useState([
    { id: 0, email: "admin@admin.com", password: "admin" },
  ]);
  const [loggedIn, setLoggedIn] = useState({ loggedIn: false, id: null });
  return (
    <>
      <NewHeader state={loggedIn} setState={setLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/signup"
          element={<Signup data={users} setState={setUsers} />}
        />
        <Route
          path="/signin"
          element={
            <Signin data={users} setState={setLoggedIn} state={loggedIn} />
          }
        />
        <Route
          path="/profile"
          element={<Profile state={loggedIn} data={users} />}
        />
        <Route path="/game" element={<GamePage state={loggedIn} />} />
        <Route
          path="/signout"
          element={<Signout setState={setLoggedIn} state={loggedIn} />}
        />
        <Route path="/*" element={<FailedPage />} />
      </Routes>
    </>
  );
}

export default App;
