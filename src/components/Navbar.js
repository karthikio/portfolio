import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle the menu open/close
  };

  const closeMenu = () => {
    setIsOpen(false); // Close the menu when a link is clicked
  };

  return (
    <nav className="navbar">
    <h2 className="logo">karthik.io</h2>
    <div className={`nav-links ${isOpen ? "open" : ""}`}>
    <li><Link to="/" onClick={closeMenu}>Home</Link></li>
    <li><Link to="/articles" onClick={closeMenu}>Articles</Link></li>
    <li>
    <a href="/files/resume.pdf" target='_blank' onClick={closeMenu}>
      Résumé 
    </a>
  </li>
    <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
    </div>
    <div className="burger" onClick={toggleMenu}>
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
    </div>
  </nav>
  );
};

export default Navbar;