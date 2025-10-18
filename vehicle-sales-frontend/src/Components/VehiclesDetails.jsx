import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const VehicleDetails = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockVehicle = {
      id: parseInt(id),
      make: "Toyota",
      model: "Camry",
      year: 2023,
      price: 28500,
      mileage: 15000,
      type: "Sedan",
      transmission: "Automatic",
      fuelType: "Gasoline",
      exterior: "Pearl White",
      interior: "Black Leather",
      vin: "1HGBH41JXMN109186",
      description: "This pristine 2023 Toyota Camry offers exceptional reliability and comfort. Features include advanced safety systems, premium sound system, and excellent fuel economy.",
      features: [
        "Backup Camera", "Bluetooth", "Cruise Control", "Keyless Entry",
        "Power Windows", "Air Conditioning", "Premium Sound", "Safety Package"
      ],
      images: [
        "https://via.placeholder.com/600x400?text=Toyota+Camry+Front",
        "https://via.placeholder.com/600x400?text=Toyota+Camry+Side",
        "https://via.placeholder.com/600x400?text=Toyota+Camry+Interior",
        "https://via.placeholder.com/600x400?text=Toyota+Camry+Back"
      ],
      dealer: {
        name: "Premium Auto Sales",
        phone: "(555) 123-4567",
        address: "123 Auto Lane, Car City, CC 12345"
      }
    };
    setVehicle(mockVehicle);
  }, [id]);

  if (!vehicle) return <div className="loading">Loading vehicle details...</div>;

  return (
    <div className="vehicle-details">
      <div className="breadcrumb">
        <Link to="/">Home</Link> > <Link to="/listing">Listings</Link> > {vehicle.make} {vehicle.model}
      </div>
      
      <div className="vehicle-header">
        <h1>{vehicle.year} {vehicle.make} {vehicle.model}</h1>
        <div className="price-badge">${vehicle.price.toLocaleString()}</div>
      </div>
      
      <div className="vehicle-content">
        {/* Image Gallery */}
        <div className="image-gallery">
          <div className="main-image">
            <img src={vehicle.images[currentImageIndex]} alt={`${vehicle.make} ${vehicle.model}`} />
          </div>
          <div className="thumbnail-strip">
            {vehicle.images.map((image, index) => (
              <img 
                key={index}
                src={image} 
                alt={`View ${index + 1}`}
                className={currentImageIndex === index ? 'active' : ''}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>
        
        {/* Vehicle Info */}
        <div className="vehicle-info">
          <div className="quick-specs">
            <div className="spec-item">
              <span className="label">Year</span>
              <span className="value">{vehicle.year}</span>
            </div>
            <div className="spec-item">
              <span className="label">Mileage</span>
              <span className="value">{vehicle.mileage.toLocaleString()} miles</span>
            </div>
            <div className="spec-item">
              <span className="label">Transmission</span>
              <span className="value">{vehicle.transmission}</span>
            </div>
            <div className="spec-item">
              <span className="label">Fuel Type</span>
              <span className="value">{vehicle.fuelType}</span>
            </div>
          </div>
          
          <div className="contact-dealer">
            <h3>Contact Dealer</h3>
            <div className="dealer-info">
              <p><strong>{vehicle.dealer.name}</strong></p>
              <p>{vehicle.dealer.phone}</p>
              <p>{vehicle.dealer.address}</p>
            </div>
            <div className="contact-buttons">
              <button className="btn-primary">Call Dealer</button>
              <button className="btn-secondary">Send Message</button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Detailed Information */}
      <div className="detailed-info">
        <div className="info-section">
          <h3>Description</h3>
          <p>{vehicle.description}</p>
        </div>
        
        <div className="info-section">
          <h3>Vehicle Details</h3>
          <div className="details-grid">
            <div className="detail-item">
              <span className="label">VIN:</span>
              <span className="value">{vehicle.vin}</span>
            </div>
            <div className="detail-item">
              <span className="label">Exterior Color:</span>
              <span className="value">{vehicle.exterior}</span>
            </div>
            <div className="detail-item">
              <span className="label">Interior:</span>
              <span className="value">{vehicle.interior}</span>
            </div>
            <div className="detail-item">
              <span className="label">Body Type:</span>
              <span className="value">{vehicle.type}</span>
            </div>
          </div>
        </div>
        
        <div className="info-section">
          <h3>Features & Options</h3>
          <div className="features-grid">
            {vehicle.features.map((feature, index) => (
              <div key={index} className="feature-item">
                <span className="checkmark">✓</span> {feature}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;
