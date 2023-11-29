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
import { LeaderBoard } from "./pages/LeaderBoard";
import { FailedPage } from "./pages/Failed";
// Components
import { Header } from "./components/header/Header";

function App() {
  const [users, setUsers] = useState([
    {
      id: 0,
      email: "guest@guest.com",
      username: "guest",
      played: 0,
      won: 0,
      lost: 0,
      draw: 0,
    },
  ]);
  const [loggedIn, setLoggedIn] = useState({ loggedIn: false, id: null });
  return (
    <>
      <Header state={loggedIn} setState={setLoggedIn} />
      <Routes>
        <Route path="/Tic-tac-toe/" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/Tic-tac-toe/signup"
          element={<Signup data={users} setState={setUsers} />}
        />
        <Route
          path="/Tic-tac-toe/signin"
          element={
            <Signin data={users} state={loggedIn} setState={setLoggedIn} />
          }
        />
        <Route
          path="/Tic-tac-toe/profile"
          element={<Profile data={users} state={loggedIn} />}
        />
        <Route
          path="/Tic-tac-toe/game"
          element={
            <GamePage data={users} setData={setUsers} state={loggedIn} />
          }
        />
        <Route
          path="/Tic-tac-toe/leaderboard"
          element={<LeaderBoard data={users} />}
        />
        <Route
          path="/Tic-tac-toe/signout"
          element={<Signout setState={setLoggedIn} state={loggedIn} />}
        />
        <Route path="/*" element={<FailedPage />} />
        <Route path="/Tic-tac-toe/*" element={<FailedPage />} />
      </Routes>
    </>
  );
}

export default App;