import axios from 'axios';
import { LoginInputTypes } from '../types';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Register user
export const registerUser = async (userData: LoginInputTypes) => {
  const response = await api.post('/register', userData);
  return response.data;
};

// Login user
export const loginUser = async (userData: LoginInputTypes) => {
  const response = await api.post('/login', userData);
  return response.data;
};
