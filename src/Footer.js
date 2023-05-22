import React from 'react';
import './App.css'; 

const Footer = () => {
  return (
    <div className="container">
      <footer className="footer-fixed d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <a href="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
            <span className="mb-3 mb-md-0 text-muted">&copy; 2023 Evan Weinberg</span>
          </a>
        </div>
        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <a className="text-muted" href="https://twitter.com/emwdx">
              Twitter
            </a>
          </li>
          <li className="ms-3">
            <a className="text-muted" href="https://instagram.com/emwdx">
              Instagram
            </a>
          </li>
          <li className="ms-3">
            <a className="text-muted" href="https://github.com/emwdx">
              GitHub
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Footer;
