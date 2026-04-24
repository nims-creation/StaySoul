import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000, // ⚡ 5 sec timeout — fail fast if backend is cold/down; shows mock data instantly
  headers: {
    'Content-Type': 'application/json',
  },
});

export const hotelApi = {
  searchHotels: async (city = '', page = 0, size = 10, minPrice = null, maxPrice = null, category = null) => {
    // Current backend requires a body for search.
    const requestBody = {
      city: city,
      startDate: new Date().toISOString().split('T')[0], // Today
      endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 5 days from now
      roomsCount: 1,
      minPrice: minPrice,
      maxPrice: maxPrice,
      category: category,
      page: page,
      size: size
    };
    
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
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data; // Expecting JWT token
  },
  signup: async (name, email, password, isHost = false) => {
    // Correctly mapping to SignUpRequestDto { email, name, password, isHost }
    const response = await apiClient.post('/auth/signup', { name, email, password, isHost });
    return response.data;
  }
};

export const bookingApi = {
  initiateBooking: async (hotelId, roomId, checkInDate, checkOutDate, roomsCount = 1) => {
    // Requires a BookingRequest Payload
    const requestBody = {
      hotelId,
      roomId,
      checkInDate,
      checkOutDate,
      roomsCount
    };
    const response = await apiClient.post('/bookings/init', requestBody);
    return response.data; // Expects BookingDto
  },

  initiatePayment: async (bookingId) => {
    const response = await apiClient.post(`/bookings/${bookingId}/payments`);
    return response.data; // Expects BookingPaymentInitResponseDto { sessionUrl: "..." }
  },

  getUserBookings: async () => {
    const response = await apiClient.get('/bookings/me');
    return response.data;
  },

  getBookingDetails: async (bookingId) => {
    const response = await apiClient.get(`/bookings/${bookingId}`);
    return response.data;
  },

  getBookingStatus: async (bookingId) => {
    const response = await apiClient.get(`/bookings/${bookingId}/status`);
    return response.data;
  },

  cancelBooking: async (bookingId) => {
    const response = await apiClient.post(`/bookings/${bookingId}/cancel`);
    return response.data;
  }
};

export const userApi = {
  getProfile: async () => {
    const response = await apiClient.get('/users/profile');
    return response.data;
  },
  upgradeToHost: async () => {
    const response = await apiClient.post('/users/upgrade-to-host');
    return response.data;
  }
};

export const adminApi = {
  getOwnedHotels: async () => {
    const response = await apiClient.get('/admin/hotels');
    return response.data.content !== undefined ? response.data.content : response.data;
  },

  createHotel: async (hotelData) => {
    const response = await apiClient.post('/admin/hotels', hotelData);
    return response.data;
  },

  updateHotel: async (hotelId, hotelData) => {
    const response = await apiClient.put(`/admin/hotels/${hotelId}`, hotelData);
    return response.data;
  },

  deleteHotel: async (hotelId) => {
    const response = await apiClient.delete(`/admin/hotels/${hotelId}`);
    return response.data;
  },

  getHotelById: async (hotelId) => {
    const response = await apiClient.get(`/admin/hotels/${hotelId}`);
    return response.data;
  },

  activateHotel: async (hotelId) => {
    const response = await apiClient.patch(`/admin/hotels/${hotelId}/activate`);
    return response.data;
  },

  getRooms: async (hotelId) => {
    const response = await apiClient.get(`/admin/hotels/${hotelId}/rooms`);
    return response.data;
  },

  addRoom: async (hotelId, roomData) => {
    const response = await apiClient.post(`/admin/hotels/${hotelId}/rooms`, roomData);
    return response.data;
  },

  deleteRoom: async (hotelId, roomId) => {
    const response = await apiClient.delete(`/admin/hotels/${hotelId}/rooms/${roomId}`);
    return response.data;
  },

  getReport: async (hotelId, startDate, endDate) => {
    const response = await apiClient.get(`/admin/hotels/${hotelId}/reports`, {
      params: { startDate, endDate }
    });
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

// Add a response interceptor to unwrap the global backend response wrapper
apiClient.interceptors.response.use((response) => {
  if (response.data && typeof response.data === 'object' && 
      response.data.hasOwnProperty('timeStamp') && 
      response.data.hasOwnProperty('error') && 
      response.data.hasOwnProperty('data')) {
    // Replace the axios data payload with the inner API data object
    response.data = response.data.data;
  }
  return response;
}, (error) => Promise.reject(error));
