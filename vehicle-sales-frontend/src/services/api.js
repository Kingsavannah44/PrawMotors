import axios from "axios";

// Base API URL (update this to match your backend)
const API_BASE_URL = "https://your-backend-url.vercel.app/api";

// Create an axios instance for reuse
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to get listings
export const fetchListings = async (params = {}) => {
  try {
    const response = await apiClient.get("/vehicles", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching listings:", error);
    throw error;
  }
};

// Function to get vehicle details
export const fetchVehicleDetails = async (vehicleId) => {
  try {
    const response = await apiClient.get(`/vehicles/${vehicleId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching vehicle details:", error);
    throw error;
  }
};

// Function to submit contact form
export const submitContact = async (contactData) => {
  try {
    const response = await apiClient.post("/contact", contactData);
    return response.data;
  } catch (error) {
    console.error("Error submitting contact:", error);
    throw error;
  }
};

// Function to submit sell car request
export const submitSellCar = async (sellData) => {
  try {
    const response = await apiClient.post("/sell-car", sellData);
    return response.data;
  } catch (error) {
    console.error("Error submitting sell car request:", error);
    throw error;
  }
};

// Function to add new vehicle
export const addVehicle = async (vehicleData) => {
  try {
    const response = await apiClient.post("/vehicles", vehicleData);
    return response.data;
  } catch (error) {
    console.error("Error adding vehicle:", error);
    throw error;
  }
};

// Function to delete vehicle
export const deleteVehicle = async (vehicleId) => {
  try {
    const response = await apiClient.delete(`/vehicles/${vehicleId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting vehicle:", error);
    throw error;
  }
};

export default apiClient;