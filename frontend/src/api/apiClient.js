import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const hotelApi = {
  searchHotels: async (city = 'Mumbai', page = 0, size = 10) => {
    // Current backend requires a body for search. We default to common values to ensure we get a response if any exist.
    const requestBody = {
      city: city,
      startDate: new Date().toISOString().split('T')[0], // Today
      endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 5 days from now
      roomsCount: 1,
      page: page,
      size: size
    };
    
    // We changed this to POST in the backend to adhere to HTTP standards since it has a body
    const response = await apiClient.post('/hotels/search', requestBody);
    return response.data;
  },

  getHotelInfo: async (hotelId) => {
    // Requires a HotelInfoRequestDto body (roomsCount)
    const requestBody = { roomsCount: 1 };
    // This is currently a GET with body from Swagger; we might need a workaround if it fails, but passing data via Axios payload on a GET might be stripped.
    // If it fails, we will fall back to mock data.
    const response = await apiClient.get(`/hotels/${hotelId}/info`, { data: requestBody });
    return response.data;
  }
};

export const authApi = {
  login: async (email, password) => {
    const response = await apiClient.post('/auth/login', { username: email, password });
    return response.data; // Expecting JWT token
  },
  signup: async (name, email, password) => {
    // Assuming AuthDto takes name, username(email), and password based on typical setup.
    // If backend requires other fields, we adjust here.
    const response = await apiClient.post('/auth/signup', { name, username: email, password });
    return response.data;
  }
};

// Add a request interceptor to dynamically inject the token if present
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));
