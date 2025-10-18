import React, { useState } from 'react';

interface VehicleFormData {
  make: string;
  model: string;
  year: number;
  price: string;
  mileage: string;
  type: string;
  transmission: string;
  fuel_type: string;
  exterior_color: string;
  interior_color: string;
  vin: string;
  description: string;
  features: string;
  images: string;
  dealer_name: string;
  dealer_phone: string;
  dealer_address: string;
}

interface Props {
  onVehicleAdded: (vehicle: any) => void;
  onCancel: () => void;
}

const AddVehicleForm: React.FC<Props> = ({ onVehicleAdded, onCancel }) => {
  const [formData, setFormData] = useState<VehicleFormData>({
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'year' ? parseInt(value) : value 
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
      }
    } catch (error) {
      console.error('Error adding vehicle:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="add-vehicle-modal">
        <div className="modal-header">
          <h2>🚗 Add New Vehicle</h2>
          <button className="close-btn" onClick={onCancel}>✕</button>
        </div>
        
        <form onSubmit={handleSubmit} className="vehicle-form">
          <div className="form-section">
            <h3>Basic Information</h3>
            <div className="form-grid-2">
              <div className="input-group">
                <label>Make *</label>
                <input
                  type="text"
                  name="make"
                  value={formData.make}
                  onChange={handleChange}
                  required
                  placeholder="Toyota, Honda, BMW..."
                />
              </div>
              <div className="input-group">
                <label>Model *</label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  required
                  placeholder="Camry, Civic, X5..."
                />
              </div>
              <div className="input-group">
                <label>Year *</label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  min="1990"
                  max={new Date().getFullYear() + 1}
                  required
                />
              </div>
              <div className="input-group">
                <label>Type *</label>
                <select name="type" value={formData.type} onChange={handleChange} required>
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Truck">Truck</option>
                  <option value="Electric">Electric</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Pricing & Specs</h3>
            <div className="form-grid-2">
              <div className="input-group">
                <label>Price *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                  placeholder="25000"
                />
              </div>
              <div className="input-group">
                <label>Mileage *</label>
                <input
                  type="number"
                  name="mileage"
                  value={formData.mileage}
                  onChange={handleChange}
                  min="0"
                  required
                  placeholder="15000"
                />
              </div>
              <div className="input-group">
                <label>Transmission</label>
                <select name="transmission" value={formData.transmission} onChange={handleChange}>
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                  <option value="CVT">CVT</option>
                </select>
              </div>
              <div className="input-group">
                <label>Fuel Type</label>
                <select name="fuel_type" value={formData.fuel_type} onChange={handleChange}>
                  <option value="Gasoline">Gasoline</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Additional Details</h3>
            <div className="input-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                placeholder="Describe the vehicle's condition, features, and highlights..."
              />
            </div>
            <div className="input-group">
              <label>Features (comma-separated)</label>
              <input
                type="text"
                name="features"
                value={formData.features}
                onChange={handleChange}
                placeholder="Backup Camera, Bluetooth, Cruise Control"
              />
            </div>
            <div className="input-group">
              <label>Image URLs (comma-separated)</label>
              <input
                type="text"
                name="images"
                value={formData.images}
                onChange={handleChange}
                placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? '⏳ Adding...' : '✅ Add Vehicle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVehicleForm;