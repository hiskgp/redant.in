import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
export const api = axios.create({ baseURL: API_URL, withCredentials: true });
export const checkHealth = () => api.get('/health');
export const getContacts = () => api.get('/api/contacts');
export const getOrders = () => api.get('/api/orders');