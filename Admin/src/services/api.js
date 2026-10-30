import axios from 'axios';

const getBaseUrl = () => {
  const envUrl = (import.meta.env.VITE_API_BASE_URL || '').trim();
  if (!envUrl) return 'http://localhost:5000/api/v1';
  let clean = envUrl.replace(/\/+$/, '');
  if (!clean.endsWith('/api/v1') && !clean.endsWith('/api')) {
    clean += '/api/v1';
  }
  return clean;
};

const API_BASE_URL = getBaseUrl();

const adminApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor to attach JWT token
adminApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('rr_admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to unwrap data
adminApi.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('rr_admin_token');
      localStorage.removeItem('rr_admin_user');
      window.dispatchEvent(new Event('admin_auth_expired'));
    }
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      'Network request failed';
    return Promise.reject(new Error(message));
  }
);

export default adminApi;
