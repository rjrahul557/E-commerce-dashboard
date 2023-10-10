import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Nav = () => {
  const auth = localStorage.getItem("user");
  console.log(auth);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };
  return (
    <div>
      <img 
      alt="logo"
      className="logo"
      src="https://img.freepik.com/premium-vector/abstract-modern-ecommerce-logo-design-colorful-gradient-happy-shopping-logo-template_467913-990.jpg" />
      {auth ? 
        <ul className="nav-ul">
          <li>
            <Link to="/">products</Link>
          </li>
          <li>
            <Link to="/add">Add products</Link>
          </li>
          <li>
            <Link to="/update">Update products</Link>
          </li>

          <li>
            <Link to="/profile">profile</Link>
          </li>
          <li>
            <Link to="/signup" onClick={logout}>
              Logout ({JSON.parse(auth).name})
            </Link>
          </li>
        </ul>
       : 
        <ul className="nav-ul nav-right">
          <li>
            <Link to="/signup">sign up</Link>
          </li>

          <li>
            <Link to="/Login">Login</Link>
          </li>
        </ul>
      }
    </div>
  );
};

export default Nav;
