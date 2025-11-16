import React from 'react';
import "../style/NavBar.css";
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const auth = localStorage.getItem('user');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
const myname  = auth? JSON.parse(localStorage.getItem("user")).name : '';
// console.log("hiiiiiii",myname);

  return (
    <nav className='navbar'>
      <div className='logo'>Ecomm</div>

      {/* Left side menu */}
      {auth && (
        <ul className='nav-links left-menu'>
          <li><Link to="/">Products</Link></li>
          <li><Link to="/add">Add Product</Link></li>
          <li><Link to="/update">Update Product</Link></li>
          <li><Link to="/profile">Profile</Link></li>
        </ul>
      )}

      {/* Right side buttons */}
      <ul className='nav-links right-menu'>
        {auth ? (
          <li>
            <button onClick={handleLogout} className='btn-nav danger'>
              Logout <span className="logout-name">({myname})</span>
            </button>
          </li>
        ) : (
          <>
            <li><Link to="/signup" className='btn-nav primary'>Signup</Link></li>
            <li><Link to="/login" className='btn-nav primary'>Login</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
