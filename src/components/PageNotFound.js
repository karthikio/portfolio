// PageNotFound.js
import React from 'react';
import { Link } from 'react-router-dom';

import "../styles/PageNotFound.css";


const PageNotFound = () => {
  return (
    <div className='page-not-found-container'>
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link className='link' to="/">Go Back to Home</Link>
    </div>
  );
};

export default PageNotFound;