import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

const register = async (name, email, password) => {
  await axios.post(`${API_URL}/register`, { name, email, password });
};

const resetPassword = async (email) => {
  await axios.post(`${API_URL}/reset-password`, { email });
};

export default { login, register, resetPassword };