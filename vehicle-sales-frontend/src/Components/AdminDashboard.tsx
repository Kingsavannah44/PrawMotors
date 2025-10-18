import React, { useState, useEffect } from 'react';
import { fetchListings } from '../services/api';
import AddVehicleForm from './AddVehicleForm';
import AdminLogin from './AdminLogin';

interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  type: string;
  images?: string[];
  vin?: string;
}

const AdminDashboard: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeTab, setActiveTab] = useState('vehicles');
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin');
    setIsAuthenticated(adminStatus === 'true');
  }, []);

  useEffect(() => {
    loadVehicles();
    loadMessages();
  }, []);

  const loadVehicles = async () => {
    try {
      const data = await fetchListings();
      setVehicles(data);
    } catch (error) {
      console.error('Error loading vehicles:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/messages');
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const handleDeleteVehicle = async (vehicleId: string) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      try {
        const response = await fetch(`http://localhost:8000/api/vehicles/${vehicleId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setVehicles(vehicles.filter(v => v.id !== vehicleId));
        }
      } catch (error) {
        console.error('Error deleting vehicle:', error);
      }
    }
  };

  const handleVehicleAdded = (newVehicle: Vehicle) => {
    setVehicles([newVehicle, ...vehicles]);
    setShowAddForm(false);
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  if (loading) return <div className="admin-loading">Loading dashboard...</div>;

  return (
    <div className="admin-dashboard">
      <div className="admin-hero">
        <div className="admin-hero-content">
          <h1>🚗 Admin Dashboard</h1>
          <p>Manage your vehicle inventory with ease</p>
          <button 
            style={{backgroundColor: 'red', color: 'white', padding: '20px 40px', fontSize: '20px', border: 'none', borderRadius: '10px', cursor: 'pointer', margin: '20px'}}
            onClick={() => setActiveTab('messages')}
          >
            TEST MESSAGES BUTTON - CLICK ME
          </button>
          <div className="admin-actions">
            <button 
              className="btn-add-vehicle"
              onClick={() => setShowAddForm(!showAddForm)}
            >
              {showAddForm ? '✕ Cancel' : '+ Add New Vehicle'}
            </button>
            <button 
              className="btn-logout"
              onClick={() => {
                localStorage.removeItem('isAdmin');
                setIsAuthenticated(false);
              }}
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </div>

      {showAddForm && (
        <div className="form-overlay">
          <AddVehicleForm 
            onVehicleAdded={handleVehicleAdded}
            onCancel={() => setShowAddForm(false)}
          />
        </div>
      )}

      <div style={{backgroundColor: 'white', padding: '20px', textAlign: 'center', margin: '20px'}}>
        <button 
          style={{padding: '15px 30px', margin: '0 10px', backgroundColor: activeTab === 'vehicles' ? '#2c5aa0' : '#666', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '16px'}}
          onClick={() => setActiveTab('vehicles')}
        >
          🚗 Vehicles ({vehicles.length})
        </button>
        <button 
          style={{padding: '15px 30px', margin: '0 10px', backgroundColor: activeTab === 'messages' ? '#2c5aa0' : '#666', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '16px'}}
          onClick={() => setActiveTab('messages')}
        >
          💬 Messages ({messages.length})
        </button>
      </div>

      <div className="admin-content">
        <div className="stats-grid">
          <div className="stat-card primary">
            <div className="stat-icon">🚗</div>
            <div className="stat-info">
              <h3>{vehicles.length}</h3>
              <p>Total Vehicles</p>
            </div>
          </div>
          <div className="stat-card success">
            <div className="stat-icon">✨</div>
            <div className="stat-info">
              <h3>{vehicles.filter(v => v.year >= 2023).length}</h3>
              <p>New Vehicles</p>
            </div>
          </div>
          <div className="stat-card warning">
            <div className="stat-icon">💎</div>
            <div className="stat-info">
              <h3>{vehicles.filter(v => v.price > 50000).length}</h3>
              <p>Luxury Vehicles</p>
            </div>
          </div>
        </div>

        {activeTab === 'vehicles' && (
          <div className="vehicles-section">
            <div className="section-header">
              <h2>Vehicle Inventory</h2>
            </div>

          <div className="vehicles-grid-admin">
            {vehicles.map(vehicle => (
              <div key={vehicle.id} className="vehicle-card-admin">
                <div className="vehicle-image">
                  <img 
                    src={vehicle.images?.[0] || 'https://via.placeholder.com/300x200?text=No+Image'} 
                    alt={`${vehicle.make} ${vehicle.model}`}
                  />
                  <div className="vehicle-badge">{vehicle.type}</div>
                </div>
                <div className="vehicle-info-admin">
                  <h3>{vehicle.make} {vehicle.model}</h3>
                  <div className="vehicle-details-admin">
                    <span className="year">{vehicle.year}</span>
                    <span className="price">${vehicle.price?.toLocaleString()}</span>
                  </div>
                  <div className="vehicle-meta">
                    <span>{vehicle.mileage?.toLocaleString()} miles</span>
                    <span>VIN: {vehicle.vin?.slice(-6) || 'N/A'}</span>
                  </div>
                  <div className="vehicle-actions">
                    <button className="btn-edit">✏️ Edit</button>
                    <button 
                      className="btn-delete"
                      onClick={() => handleDeleteVehicle(vehicle.id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        )}

        {activeTab === 'messages' && (
          <div className="messages-section">
            <div className="section-header">
              <h2>Customer Messages</h2>
            </div>
            <div className="messages-list">
              {messages.map(message => (
                <div key={message._id} className="message-card">
                  <div className="message-header">
                    <h3>{message.name}</h3>
                    <span className="message-date">
                      {new Date(message.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="message-info">
                    <p><strong>Email:</strong> {message.email}</p>
                    <p><strong>Phone:</strong> {message.phone || 'N/A'}</p>
                    <p><strong>Subject:</strong> {message.subject}</p>
                  </div>
                  <div className="message-content">
                    <p>{message.message}</p>
                  </div>
                  <div className="message-actions">
                    <button className="btn-reply">📧 Reply</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;