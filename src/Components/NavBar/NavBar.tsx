import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const navLogin = () => {
    navigate('/login'); // Navigates to /login
  };

  return (
    <header className="header">
      <Link to="/" className="logo">TDM</Link>

      <nav className="navbar">
        <Link to="/dashboard" >Home</Link>
        <Link to="/categories" >Category</Link>
        <Link to="/item">Item</Link>
        <Link to="/stock">Stock</Link>
        <Link to="/cart">POS</Link>
        {/* Use onClick only if you want to handle it differently; otherwise, Link is enough */}
        <Link to="/" onClick={navLogin}>Logout</Link>
      </nav>
    </header>
  );
};

export default Navbar;
