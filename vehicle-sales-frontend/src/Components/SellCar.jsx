import React, { useState } from 'react';

const SellCar = () => {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    mileage: '',
    price: '',
    condition: '',
    description: '',
    contact: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you! We will contact you soon about your vehicle.');
  };

  return (
    <div className="sell-car">
      <div className="sell-header">
        <h1>Sell Your Vehicle</h1>
        <p>Get the best value for your car with our easy selling process</p>
      </div>
      
      <div className="sell-content">
        <div className="sell-form">
          <h2>Vehicle Information</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                type="text"
                name="make"
                placeholder="Make (e.g., Toyota)"
                value={formData.make}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="model"
                placeholder="Model (e.g., Camry)"
                value={formData.model}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-row">
              <input
                type="number"
                name="year"
                placeholder="Year"
                value={formData.year}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="mileage"
                placeholder="Mileage"
                value={formData.mileage}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-row">
              <input
                type="number"
                name="price"
                placeholder="Expected Price ($)"
                value={formData.price}
                onChange={handleChange}
                required
              />
              <select
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                required
              >
                <option value="">Select Condition</option>
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                <option value="poor">Poor</option>
              </select>
            </div>
            
            <textarea
              name="description"
              placeholder="Additional details about your vehicle..."
              value={formData.description}
              onChange={handleChange}
              rows="4"
            />
            
            <input
              type="text"
              name="contact"
              placeholder="Your phone number"
              value={formData.contact}
              onChange={handleChange}
              required
            />
            
            <button type="submit" className="btn-primary">Submit Vehicle Info</button>
          </form>
        </div>
        
        <div className="sell-benefits">
          <h2>Why Sell With Us?</h2>
          <div className="benefit-item">
            <h3>🏆 Best Prices</h3>
            <p>We offer competitive prices for your vehicle</p>
          </div>
          <div className="benefit-item">
            <h3>⚡ Quick Process</h3>
            <p>Get an offer within 24 hours</p>
          </div>
          <div className="benefit-item">
            <h3>📋 Free Inspection</h3>
            <p>Professional vehicle assessment at no cost</p>
          </div>
          <div className="benefit-item">
            <h3>💰 Instant Payment</h3>
            <p>Get paid immediately upon agreement</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellCar;