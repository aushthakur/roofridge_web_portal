import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor to attach bearer token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('rr_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to unwrap data
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      'An error occurred';
    return Promise.reject(new Error(message));
  }
);

// ──────────────────────────────────────────────
// API METHODS
// ──────────────────────────────────────────────

export const api = {
  // ── Authentication ──
  sendOtp: (phone) => apiClient.post('/auth/send-otp', { phone }),
  verifyOtp: (phone, otp) => apiClient.post('/auth/verify-otp', { phone, otp }),
  googleSignIn: (tokenId, email, name) => apiClient.post('/auth/google', { tokenId, email, name }),
  getMe: () => apiClient.get('/auth/me'),
  updateProfile: (data) => apiClient.put('/auth/profile', data),
  submitKyc: (data) => apiClient.post('/auth/kyc', data),

  // ── Properties Marketplace ──
  getProperties: (params = {}) => apiClient.get('/properties', { params }),
  getMyProperties: () => apiClient.get('/properties/my/listings'),
  getPropertyById: (idOrSlug) => apiClient.get(`/properties/${idOrSlug}`),
  createProperty: (data) => apiClient.post('/properties', data),
  updateProperty: (id, data) => apiClient.put(`/properties/${id}`, data),
  deleteProperty: (id) => apiClient.delete(`/properties/${id}`),
  toggleSaveProperty: (id) => apiClient.post(`/properties/${id}/save`),
  submitPropertyEnquiry: (id, data) => apiClient.post(`/properties/${id}/enquiry`, data),
  getAiValuation: (data) => apiClient.post('/properties/ai-valuation', data),

  // ── CRM Leads ──
  captureLead: (data) => apiClient.post('/leads/capture', data),

  // ── Services & Maintenance Bookings ──
  createBooking: (data) => apiClient.post('/bookings', data),
  getMyBookings: () => apiClient.get('/bookings/my'),

  // ── Materials Marketplace ──
  getMaterialCategories: () => apiClient.get('/materials/categories'),
  getMaterialProducts: (params = {}) => apiClient.get('/materials/products', { params }),
  getMaterialProductById: (idOrSlug) => apiClient.get(`/materials/products/${idOrSlug}`),
  createMaterialOrder: (data) => apiClient.post('/materials/orders', data),
  getMyOrders: () => apiClient.get('/materials/orders/my'),

  // ── Loans, Legal & Finance ──
  getLoanEligibility: (data) => apiClient.post('/finance/eligibility', data),
  applyLoan: (data) => apiClient.post('/finance/loans', data),
  requestLegalConsultation: (data) => apiClient.post('/finance/legal', data),
  getMyFinanceRequests: () => apiClient.get('/finance/my'),

  // ── B2B Partners Directory ──
  getPartners: (params = {}) => apiClient.get('/partners', { params }),
  onboardPartner: (data) => apiClient.post('/partners/onboard', data),

  // ── CMS & Banners ──
  getBanners: (placement = 'home_hero') => apiClient.get(`/cms/banners?placement=${placement}`),
  getReviews: (params = {}) => apiClient.get('/cms/reviews', { params }),
  submitReview: (data) => apiClient.post('/cms/reviews', data),

  // ── In-App Notifications ──
  getNotifications: () => apiClient.get('/notifications'),
  markNotificationRead: (id) => apiClient.put(`/notifications/${id}/read`),
  markAllNotificationsRead: () => apiClient.put('/notifications/read-all'),
};

export default api;
