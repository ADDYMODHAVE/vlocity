// client/src/services/api.js
import axios from "axios";

const API_URL = "http://localhost:5000/api";

const register = async (userData) => {
  const response = await axios.post(`${API_URL}/users/register`, userData);
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(`${API_URL}/users/login`, userData);
  return response.data;
};
const profile = async (token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.get(`${API_URL}/users/profile`, config);
  return response.data;
};

const createPoll = async (pollData, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.post(`${API_URL}/polls`, pollData, config);
  return response.data;
};

const getPolls = async () => {
  const response = await axios.get(`${API_URL}/polls`);
  return response.data;
};

const getPoll = async (pollId) => {
  const response = await axios.get(`${API_URL}/polls/${pollId}`);
  return response.data;
};

const votePoll = async (pollId, optionId, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.post(`${API_URL}/polls/${pollId}/vote/${optionId}`, {}, config);
  return response.data;
};

const addComment = async (pollId, commentData, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.post(`${API_URL}/polls/${pollId}/comments`, commentData, config);
  return response.data;
};

export { register, profile, login, createPoll, getPolls, getPoll, votePoll, addComment };
