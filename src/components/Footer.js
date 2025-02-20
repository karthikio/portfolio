import React from "react";
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <p>
        &copy; {new Date().getFullYear()} Karthik Santhosh | Fueled by ☕ and Creativity
      </p>
    </footer>
  );
};

export default Footer;