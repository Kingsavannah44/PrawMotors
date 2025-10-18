import React from "react";
import { Link } from "react-router-dom";
import logo from '../assets/Praw.PNG';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px'}}>
            <img src={logo} alt="PrawMotors" style={{height: '40px', borderRadius: '8px'}} />
            <h3>PrawMotors</h3>
          </div>
          <p>Your trusted partner in finding the perfect vehicle. Quality cars, competitive prices, exceptional service across Kenya.</p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">📘 Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">📷 Instagram</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">🐦 Twitter</a>
          </div>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/listing">Browse Cars</Link></li>
            <li><Link to="/sell">Sell Your Car</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Our Services</h4>
          <ul>
            <li><a href="#">Vehicle Sales</a></li>
            <li><a href="#">Car Financing</a></li>
            <li><a href="#">Trade-In Services</a></li>
            <li><a href="#">Vehicle Inspection</a></li>
            <li><a href="#">Insurance Assistance</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Contact Info</h4>
          <div className="contact-info">
            <p><strong>📍 Address:</strong><br/>80100 Mombasa, Kenya</p>
            <p><strong>📞 Phone:</strong><br/>+254 742 970 207</p>
            <p><strong>✉️ Email:</strong><br/>vicpraw26@gmail.com</p>
            <p><strong>🕒 Business Hours:</strong><br/>Mon-Sat: 8AM-6PM<br/>Sunday: 10AM-4PM</p>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px'}}>
          <p>&copy; {currentYear} PrawMotors Kenya. All rights reserved.</p>
          <div>
            <Link to="/privacy" style={{color: '#95a5a6', textDecoration: 'none', margin: '0 10px'}}>Privacy Policy</Link>
            <Link to="/terms" style={{color: '#95a5a6', textDecoration: 'none', margin: '0 10px'}}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
