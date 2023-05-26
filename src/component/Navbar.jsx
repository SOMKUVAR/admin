import React from "react";
import { Link } from "react-router-dom";
import HOME_LINKS from "../constants/HomeLinks";
import UNIVERSITY_LINKS from "../constants/UniversityLinks";

const Navbar = (props) => {
  const { navbarType } = props;
  const links = navbarType === "home" ? HOME_LINKS : UNIVERSITY_LINKS;
  const logOut = ()=> {
  localStorage.removeItem("student_login");
  window.location.href = '/';
  }
  return (
    <div className="w-full top-0 bg-red-900 font-bold text-white flex flex-col md:flex-row  justify-between p-5">
      <div>
        {navbarType === "home" && <Link to="/">VERIFICATION</Link>}
        {navbarType === "university" && <button onClick={()=> props.setIsOpenLeftSidebar(prev => !prev)}>VERIFICATION</button>}
      </div>
      <ul className="flex flex-col items-center md:flex-row">
        {links.map((link) => (
          <li className="mx-3 mb-1">
            <Link to={link.to}>{link.name}</Link>
          </li>
        ))}

        { navbarType !== "home" && <li className="mx-3 mb-1 cursor-pointer" onClick={logOut}>Log Out</li>}
      </ul>
    </div>
  );
};

export default Navbar;
