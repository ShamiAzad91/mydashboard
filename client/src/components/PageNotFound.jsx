import React from 'react';
import { Link } from 'react-router-dom';
import "../style/PageNotFound.css"

const PageNotFound = () => {
  return (
    <div className="notfound-container">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Sorry, the page you’re looking for doesn’t exist.</p>
      <Link to="/">
        <button>Go Back Home</button>
      </Link>
    </div>
  )
}

export default PageNotFound