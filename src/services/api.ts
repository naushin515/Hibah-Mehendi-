import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Request interceptor — attach token to every request
api.interceptors.request.use((config) => {
  try {
    const user = localStorage.getItem('hibah-user');
    if (user) {
      const parsed = JSON.parse(user);
      if (parsed?.token) {
        config.headers.Authorization = `Bearer ${parsed.token}`;
      }
    }
  } catch {
    localStorage.removeItem('hibah-user');
  }
  return config;
}, (error) => Promise.reject(error));

// ✅ Response interceptor — auto logout on 401 (expired/invalid token)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const currentPath = window.location.pathname;
      // Only redirect if not already on login page
      if (currentPath !== '/login') {
        localStorage.removeItem('hibah-user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
