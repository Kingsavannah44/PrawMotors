import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/listing?search=${encodeURIComponent(searchTerm)}`);
    } else {
      navigate('/listing');
    }
  };
  const [featuredVehicles] = useState([
    { id: 1, make: "Toyota", model: "Camry", year: 2023, price: 28500, image: "https://via.placeholder.com/300x200?text=Toyota+Camry" },
    { id: 2, make: "Honda", model: "Civic", year: 2023, price: 24500, image: "https://via.placeholder.com/300x200?text=Honda+Civic" },
    { id: 3, make: "BMW", model: "X5", year: 2022, price: 65000, image: "https://via.placeholder.com/300x200?text=BMW+X5" }
  ]);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Find Your Perfect Vehicle</h1>
          <p>Discover thousands of quality cars, trucks, and SUVs</p>
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Search by make, model, or year..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="stats">
        <div className="stat-item">
          <h3>5000+</h3>
          <p>Vehicles Available</p>
        </div>
        <div className="stat-item">
          <h3>50+</h3>
          <p>Trusted Dealers</p>
        </div>
        <div className="stat-item">
          <h3>10k+</h3>
          <p>Happy Customers</p>
        </div>
      </section>

      {/* Featured Vehicles */}
      <section className="featured">
        <h2>Featured Vehicles</h2>
        <div className="vehicle-grid">
          {featuredVehicles.map(vehicle => (
            <div key={vehicle.id} className="vehicle-card">
              <img src={vehicle.image} alt={`${vehicle.make} ${vehicle.model}`} />
              <div className="vehicle-info">
                <h3>{vehicle.make} {vehicle.model}</h3>
                <p className="year">{vehicle.year}</p>
                <p className="price">${vehicle.price.toLocaleString()}</p>
                <Link to={`/vehicles/${vehicle.id}`} className="btn-primary">View Details</Link>
              </div>
            </div>
          ))}
        </div>
        <div className="view-all">
          <Link to="/listing" className="btn-secondary">View All Vehicles</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
