import React from 'react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div style={{maxWidth: '800px', margin: '0 auto', padding: '40px 20px'}}>
      <div style={{marginBottom: '20px'}}>
        <button onClick={() => navigate(-1)} style={{padding: '10px 20px', marginRight: '10px', border: 'none', borderRadius: '5px', background: '#2c5aa0', color: 'white', cursor: 'pointer'}}>← Back</button>
        <button onClick={() => window.print()} style={{padding: '10px 20px', border: 'none', borderRadius: '5px', background: '#28a745', color: 'white', cursor: 'pointer'}}>🖨️ Print</button>
      </div>
      <h1>Privacy Policy</h1>
      <p><em>Last updated: January 2025</em></p>
      
      <h2>Information We Collect</h2>
      <p>We collect information you provide when you:</p>
      <ul>
        <li>Browse our vehicle inventory</li>
        <li>Submit contact forms or inquiries</li>
        <li>Request vehicle information</li>
        <li>Use our sell your car service</li>
      </ul>

      <h2>How We Use Your Information</h2>
      <p>Your information is used to:</p>
      <ul>
        <li>Respond to your inquiries about vehicles</li>
        <li>Process vehicle sales and purchases</li>
        <li>Improve our services</li>
        <li>Send you relevant vehicle listings (with your consent)</li>
      </ul>

      <h2>Information Sharing</h2>
      <p>We do not sell or share your personal information with third parties except:</p>
      <ul>
        <li>With your explicit consent</li>
        <li>To comply with legal requirements</li>
        <li>To protect our rights and safety</li>
      </ul>

      <h2>Contact Us</h2>
      <p>For privacy concerns, contact us at:</p>
      <p>Email: <a href="mailto:vicpraw26@gmail.com">vicpraw26@gmail.com</a><br/>
      Phone: <a href="tel:+254742970207">+254 742 970 207</a></p>
      
      <div style={{marginTop: '30px', padding: '20px', background: '#f8f9fa', borderRadius: '10px'}}>
        <h3>Quick Privacy Question?</h3>
        <button 
          onClick={() => window.location.href = '/contact'}
          style={{padding: '12px 24px', background: '#2c5aa0', color: 'white', border: 'none', borderRadius: '25px', cursor: 'pointer'}}
        >
          Contact Us Now
        </button>
      </div>
    </div>
  );
};

export default PrivacyPolicy;