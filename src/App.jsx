import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar";
import About from "./pages/About";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Student from "./pages/Student";
import Scanner from "./pages/Scanner";

function App() {
  const [isOpenLeftSidebar, setIsOpenLeftSidebar] = useState(false);
  const [navbarType, setNavbarType] = useState("home");

  const isLogin = localStorage.getItem("student_login");

  return (
    <div className="min-h-full bg-red-50">
      <Navbar
        navbarType={navbarType}
        setIsOpenLeftSidebar={setIsOpenLeftSidebar}
      />
      <div className="mx-w-screen-md mx-auto">
        <Routes>
          {isLogin && (
            <Route
              path="/student/:roll_number"
              element={
                <Student
                  setNavbarType={setNavbarType}
                  isOpenLeftSidebar={isOpenLeftSidebar}
                />
              }
            />
          )}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/verify" element={<Scanner />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
