import React from 'react';
import { useNavigate } from 'react-router-dom';

const TermsOfService = () => {
  const navigate = useNavigate();

  return (
    <div style={{maxWidth: '800px', margin: '0 auto', padding: '40px 20px'}}>
      <div style={{marginBottom: '20px'}}>
        <button onClick={() => navigate(-1)} style={{padding: '10px 20px', marginRight: '10px', border: 'none', borderRadius: '5px', background: '#2c5aa0', color: 'white', cursor: 'pointer'}}>← Back</button>
        <button onClick={() => window.print()} style={{padding: '10px 20px', border: 'none', borderRadius: '5px', background: '#28a745', color: 'white', cursor: 'pointer'}}>🖨️ Print</button>
      </div>
      <h1>Terms of Service</h1>
      <p><em>Last updated: January 2025</em></p>
      
      <h2>Acceptance of Terms</h2>
      <p>By using PrawMotors services, you agree to these terms and conditions.</p>

      <h2>Vehicle Listings</h2>
      <ul>
        <li>All vehicle information is provided in good faith</li>
        <li>Prices and availability subject to change</li>
        <li>Vehicle condition described to the best of our knowledge</li>
        <li>Test drives available with valid driver's license</li>
      </ul>

      <h2>Purchase Terms</h2>
      <ul>
        <li>All sales are final once payment is completed</li>
        <li>Financing options available subject to approval</li>
        <li>Trade-in values determined by vehicle inspection</li>
        <li>Documentation fees may apply</li>
      </ul>

      <h2>Sell Your Car Service</h2>
      <ul>
        <li>Vehicle evaluations are estimates only</li>
        <li>Final purchase price determined after inspection</li>
        <li>We reserve the right to decline any vehicle</li>
        <li>Payment processed within 24 hours of agreement</li>
      </ul>

      <h2>Limitation of Liability</h2>
      <p>PrawMotors is not liable for any indirect or consequential damages arising from the use of our services.</p>

      <h2>Contact Information</h2>
      <p>For questions about these terms:</p>
      <p>Email: <a href="mailto:vicpraw26@gmail.com">vicpraw26@gmail.com</a><br/>
      Phone: <a href="tel:+254742970207">+254 742 970 207</a><br/>
      Address: 80100 Mombasa, Kenya</p>
      
      <div style={{marginTop: '30px', padding: '20px', background: '#f8f9fa', borderRadius: '10px'}}>
        <h3>Need Legal Assistance?</h3>
        <div style={{display: 'flex', gap: '10px', marginTop: '15px'}}>
          <button 
            onClick={() => window.location.href = '/contact'}
            style={{padding: '12px 24px', background: '#2c5aa0', color: 'white', border: 'none', borderRadius: '25px', cursor: 'pointer'}}
          >
            Contact Us
          </button>
          <button 
            onClick={() => window.location.href = '/listing'}
            style={{padding: '12px 24px', background: '#28a745', color: 'white', border: 'none', borderRadius: '25px', cursor: 'pointer'}}
          >
            Browse Cars
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;