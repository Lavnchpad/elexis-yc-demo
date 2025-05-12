import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Attach token automatically
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken");
    if (token && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    // Set default Content-Type if not set
    if (!config.headers['Content-Type']) {
        config.headers['Content-Type'] = 'application/json';
    }

    return config;
}, (error) => Promise.reject(error));

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Redirect to login
            window.location.href = '/login';
            // OR, if using Vue Router or React Router:
            // router.push('/login');
        }
        return Promise.reject(error);
    }
);

export default api;
