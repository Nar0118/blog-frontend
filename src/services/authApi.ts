import axios from 'axios';
import { Inputs } from '../components/Login';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Register user
export const registerUser = async (userData: Inputs) => {
  const response = await api.post('/register', userData);
  return response.data;
};

// Login user
export const loginUser = async (userData: Inputs) => {
  const response = await api.post('/login', userData);
  return response.data;
};
