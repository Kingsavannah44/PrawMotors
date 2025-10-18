import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const Listings = () => {
  const [searchParams] = useSearchParams();
  const [vehicles, setVehicles] = useState([
    { id: 1, make: "Toyota", model: "Camry", year: 2023, price: 28500, mileage: 15000, type: "Sedan", image: "https://via.placeholder.com/300x200?text=Toyota+Camry" },
    { id: 2, make: "Honda", model: "Civic", year: 2023, price: 24500, mileage: 12000, type: "Sedan", image: "https://via.placeholder.com/300x200?text=Honda+Civic" },
    { id: 3, make: "BMW", model: "X5", year: 2022, price: 65000, mileage: 8000, type: "SUV", image: "https://via.placeholder.com/300x200?text=BMW+X5" },
    { id: 4, make: "Ford", model: "F-150", year: 2023, price: 45000, mileage: 5000, type: "Truck", image: "https://via.placeholder.com/300x200?text=Ford+F150" },
    { id: 5, make: "Tesla", model: "Model 3", year: 2023, price: 42000, mileage: 3000, type: "Electric", image: "https://via.placeholder.com/300x200?text=Tesla+Model+3" },
    { id: 6, make: "Audi", model: "A4", year: 2022, price: 38000, mileage: 18000, type: "Sedan", image: "https://via.placeholder.com/300x200?text=Audi+A4" }
  ]);
  const [filteredVehicles, setFilteredVehicles] = useState(vehicles);
  const [filters, setFilters] = useState({
    make: searchParams.get('search') || '',
    type: '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'price-low'
  });

  useEffect(() => {
    let filtered = [...vehicles];
    
    if (filters.make) {
      filtered = filtered.filter(v => 
        v.make.toLowerCase().includes(filters.make.toLowerCase()) ||
        v.model.toLowerCase().includes(filters.make.toLowerCase())
      );
    }
    if (filters.type) {
      filtered = filtered.filter(v => v.type === filters.type);
    }
    if (filters.minPrice) {
      filtered = filtered.filter(v => v.price >= parseInt(filters.minPrice));
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(v => v.price <= parseInt(filters.maxPrice));
    }
    
    // Sort
    filtered.sort((a, b) => {
      switch(filters.sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'year-new': return b.year - a.year;
        case 'mileage-low': return a.mileage - b.mileage;
        default: return 0;
      }
    });
    
    setFilteredVehicles(filtered);
  }, [filters, vehicles]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="listings">
      <div className="listings-header">
        <h1>Browse Our Inventory</h1>
        <p>{filteredVehicles.length} vehicles found</p>
      </div>
      
      <div className="listings-container">
        {/* Filters Sidebar */}
        <div className="filters">
          <h3>Filter Results</h3>
          
          <div className="filter-group">
            <label>Make</label>
            <input 
              type="text" 
              placeholder="Search make..."
              value={filters.make}
              onChange={(e) => handleFilterChange('make', e.target.value)}
            />
          </div>
          
          <div className="filter-group">
            <label>Vehicle Type</label>
            <select value={filters.type} onChange={(e) => handleFilterChange('type', e.target.value)}>
              <option value="">All Types</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Truck">Truck</option>
              <option value="Electric">Electric</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Price Range</label>
            <div className="price-inputs">
              <input 
                type="number" 
                placeholder="Min"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              />
              <input 
                type="number" 
                placeholder="Max"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              />
            </div>
          </div>
          
          <div className="filter-group">
            <label>Sort By</label>
            <select value={filters.sortBy} onChange={(e) => handleFilterChange('sortBy', e.target.value)}>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="year-new">Year: Newest First</option>
              <option value="mileage-low">Mileage: Low to High</option>
            </select>
          </div>
        </div>
        
        {/* Vehicle Grid */}
        <div className="vehicles-grid">
          {filteredVehicles.map(vehicle => (
            <div key={vehicle.id} className="vehicle-card">
              <img src={vehicle.image} alt={`${vehicle.make} ${vehicle.model}`} />
              <div className="vehicle-info">
                <h3>{vehicle.make} {vehicle.model}</h3>
                <div className="vehicle-details">
                  <span className="year">{vehicle.year}</span>
                  <span className="mileage">{vehicle.mileage.toLocaleString()} miles</span>
                  <span className="type">{vehicle.type}</span>
                </div>
                <p className="price">${vehicle.price.toLocaleString()}</p>
                <Link to={`/vehicles/${vehicle.id}`} className="btn-primary">View Details</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Listings;
