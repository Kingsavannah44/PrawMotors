import React, { useState } from 'react';

const AddVehicleForm = ({ onVehicleAdded, onCancel }) => {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    price: '',
    mileage: '',
    type: 'Sedan',
    transmission: 'Automatic',
    fuel_type: 'Gasoline',
    exterior_color: '',
    interior_color: '',
    vin: '',
    description: '',
    features: '',
    images: '',
    dealer_name: 'PrawMotors',
    dealer_phone: '(555) 123-4567',
    dealer_address: '123 Auto Lane, Car City, CC 12345'
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'year' ? parseInt(value) : value 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const vehicleData = {
        ...formData,
        year: parseInt(formData.year.toString()),
        price: parseFloat(formData.price),
        mileage: parseInt(formData.mileage),
        features: formData.features.split(',').map(f => f.trim()).filter(f => f),
        images: formData.images.split(',').map(img => img.trim()).filter(img => img)
      };

      const response = await fetch('http://localhost:8000/api/vehicles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vehicleData),
      });

      if (response.ok) {
        const newVehicle = await response.json();
        onVehicleAdded(newVehicle);
        alert('Vehicle added successfully!');
      }
    } catch (error) {
      console.error('Error adding vehicle:', error);
      alert('Error adding vehicle');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '40px',
      borderRadius: '20px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      maxWidth: '800px',
      width: '90%',
      maxHeight: '90vh',
      overflowY: 'auto'
    }}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px'}}>
        <h2 style={{color: '#333', margin: 0}}>🚗 Add New Vehicle</h2>
        <button 
          onClick={onCancel}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: '#666'
          }}
        >
          ✕
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px'}}>
          <div>
            <label style={{display: 'block', marginBottom: '8px', fontWeight: '600', color: '#555'}}>Make *</label>
            <input
              type="text"
              name="make"
              value={formData.make}
              onChange={handleChange}
              required
              placeholder="Toyota, Honda, BMW..."
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e1e5e9',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            />
          </div>
          <div>
            <label style={{display: 'block', marginBottom: '8px', fontWeight: '600', color: '#555'}}>Model *</label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
              required
              placeholder="Camry, Civic, X5..."
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e1e5e9',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            />
          </div>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '20px'}}>
          <div>
            <label style={{display: 'block', marginBottom: '8px', fontWeight: '600', color: '#555'}}>Year *</label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              min="1990"
              max={new Date().getFullYear() + 1}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e1e5e9',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            />
          </div>
          <div>
            <label style={{display: 'block', marginBottom: '8px', fontWeight: '600', color: '#555'}}>Price *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
              placeholder="25000"
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e1e5e9',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            />
          </div>
          <div>
            <label style={{display: 'block', marginBottom: '8px', fontWeight: '600', color: '#555'}}>Mileage *</label>
            <input
              type="number"
              name="mileage"
              value={formData.mileage}
              onChange={handleChange}
              min="0"
              required
              placeholder="15000"
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e1e5e9',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            />
          </div>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px'}}>
          <div>
            <label style={{display: 'block', marginBottom: '8px', fontWeight: '600', color: '#555'}}>Type *</label>
            <select 
              name="type" 
              value={formData.type} 
              onChange={handleChange} 
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e1e5e9',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            >
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Truck">Truck</option>
              <option value="Electric">Electric</option>
            </select>
          </div>
          <div>
            <label style={{display: 'block', marginBottom: '8px', fontWeight: '600', color: '#555'}}>Transmission</label>
            <select 
              name="transmission" 
              value={formData.transmission} 
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e1e5e9',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            >
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
              <option value="CVT">CVT</option>
            </select>
          </div>
        </div>

        <div style={{marginBottom: '20px'}}>
          <label style={{display: 'block', marginBottom: '8px', fontWeight: '600', color: '#555'}}>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            placeholder="Describe the vehicle's condition, features, and highlights..."
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #e1e5e9',
              borderRadius: '8px',
              fontSize: '1rem',
              resize: 'vertical'
            }}
          />
        </div>

        <div style={{marginBottom: '20px'}}>
          <label style={{display: 'block', marginBottom: '8px', fontWeight: '600', color: '#555'}}>Features (comma-separated)</label>
          <input
            type="text"
            name="features"
            value={formData.features}
            onChange={handleChange}
            placeholder="Backup Camera, Bluetooth, Cruise Control"
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #e1e5e9',
              borderRadius: '8px',
              fontSize: '1rem'
            }}
          />
        </div>

        <div style={{marginBottom: '30px'}}>
          <label style={{display: 'block', marginBottom: '8px', fontWeight: '600', color: '#555'}}>Image URLs (comma-separated)</label>
          <input
            type="text"
            name="images"
            value={formData.images}
            onChange={handleChange}
            placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #e1e5e9',
              borderRadius: '8px',
              fontSize: '1rem'
            }}
          />
        </div>

        <div style={{display: 'flex', gap: '15px', justifyContent: 'flex-end'}}>
          <button 
            type="button" 
            onClick={onCancel}
            style={{
              padding: '12px 24px',
              border: '2px solid #2c5aa0',
              background: 'transparent',
              color: '#2c5aa0',
              borderRadius: '25px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={loading}
            style={{
              padding: '12px 24px',
              border: 'none',
              background: loading ? '#ccc' : '#2c5aa0',
              color: 'white',
              borderRadius: '25px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: '600'
            }}
          >
            {loading ? '⏳ Adding...' : '✅ Add Vehicle'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddVehicleForm;