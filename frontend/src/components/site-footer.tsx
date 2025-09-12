import React from 'react';
import '@css/site-footer.css';

const SiteFooter: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2 className="footer-logo">My Store</h2>
          <p>
            Providing quality products since 2023.
          </p>
        </div>
        <div className="footer-section links">
          <h2>Quick Links</h2>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/cart">Cart</a></li>
          </ul>
        </div>
        <div className="footer-section social">
          <h2>Follow Us</h2>
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
          <a href="#">Instagram</a>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} My Store | All Rights Reserved
      </div>
    </footer>
  );
};

export default SiteFooter;