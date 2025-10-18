import React, { useState, useEffect } from 'react';
import { fetchListings } from '../services/api';
import AddVehicleForm from './AddVehicleForm';
import AdminLogin from './AdminLogin';
import logo from '../assets/Praw.PNG';

const AdminDashboard = () => {
  const [vehicles, setVehicles] = useState([]);
  const [messages, setMessages] = useState([]);
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

  const handleDeleteVehicle = async (vehicleId) => {
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

  const handleVehicleAdded = (newVehicle) => {
    setVehicles([newVehicle, ...vehicles]);
    setShowAddForm(false);
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div className="admin-dashboard">
      <div style={{backgroundColor: '#2c5aa0', color: 'white', padding: '40px', textAlign: 'center'}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginBottom: '10px'}}>
          <img src={logo} alt="PrawMotors" style={{height: '60px', borderRadius: '10px'}} />
          <h1 style={{margin: 0}}>Admin Dashboard</h1>
        </div>
        <p>Manage your vehicle inventory with ease</p>
        
        <div style={{margin: '20px 0'}}>
          <button 
            style={{
              backgroundColor: activeTab === 'vehicles' ? '#ff6b35' : 'white', 
              color: activeTab === 'vehicles' ? 'white' : '#333',
              padding: '15px 30px', 
              margin: '0 10px', 
              border: 'none', 
              borderRadius: '25px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
            onClick={() => setActiveTab('vehicles')}
          >
            🚗 Vehicles ({vehicles.length})
          </button>
          <button 
            style={{
              backgroundColor: activeTab === 'messages' ? '#ff6b35' : 'white', 
              color: activeTab === 'messages' ? 'white' : '#333',
              padding: '15px 30px', 
              margin: '0 10px', 
              border: 'none', 
              borderRadius: '25px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
            onClick={() => setActiveTab('messages')}
          >
            💬 Messages ({messages.length})
          </button>
        </div>

        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          style={{backgroundColor: '#28a745', color: 'white', padding: '12px 24px', border: 'none', borderRadius: '20px', margin: '10px', cursor: 'pointer'}}
        >
          {showAddForm ? '✕ Cancel' : '+ Add Vehicle'}
        </button>
        
        <button 
          onClick={() => {
            localStorage.removeItem('isAdmin');
            setIsAuthenticated(false);
          }}
          style={{backgroundColor: '#dc3545', color: 'white', padding: '12px 24px', border: 'none', borderRadius: '20px', margin: '10px', cursor: 'pointer'}}
        >
          🚪 Logout
        </button>
      </div>

      {showAddForm && (
        <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <AddVehicleForm 
            onVehicleAdded={handleVehicleAdded}
            onCancel={() => setShowAddForm(false)}
          />
        </div>
      )}

      <div style={{padding: '40px 20px', maxWidth: '1200px', margin: '0 auto'}}>
        {activeTab === 'vehicles' && (
          <div>
            <h2>Vehicle Inventory</h2>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '20px'}}>
              {vehicles.map(vehicle => (
                <div key={vehicle.id} style={{backgroundColor: 'white', borderRadius: '10px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)'}}>
                  <img 
                    src={vehicle.images?.[0] || 'https://via.placeholder.com/300x200?text=No+Image'} 
                    alt={`${vehicle.make} ${vehicle.model}`}
                    style={{width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px'}}
                  />
                  <h3>{vehicle.make} {vehicle.model}</h3>
                  <p>Year: {vehicle.year} | Price: ${vehicle.price?.toLocaleString()}</p>
                  <p>Mileage: {vehicle.mileage?.toLocaleString()} miles</p>
                  <button 
                    onClick={() => handleDeleteVehicle(vehicle.id)}
                    style={{backgroundColor: '#dc3545', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px'}}
                  >
                    🗑️ Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div>
            <h2>Customer Messages</h2>
            <div style={{marginTop: '20px'}}>
              {messages.map(message => (
                <div key={message._id} style={{backgroundColor: 'white', padding: '20px', marginBottom: '15px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', borderLeft: '4px solid #2c5aa0'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
                    <h3>{message.name}</h3>
                    <span style={{color: '#666'}}>{new Date(message.created_at).toLocaleDateString()}</span>
                  </div>
                  <p><strong>Email:</strong> {message.email}</p>
                  <p><strong>Phone:</strong> {message.phone || 'N/A'}</p>
                  <p><strong>Subject:</strong> {message.subject}</p>
                  <div style={{backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '8px', marginTop: '10px'}}>
                    <p>{message.message}</p>
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