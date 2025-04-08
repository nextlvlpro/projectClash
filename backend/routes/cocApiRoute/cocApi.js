// backend/routes/cocApiRoute/cocApi.js

const axios = require('axios');
const { cocApiToken } = require('../../config/config');

// Create a custom Axios instance
const cocApi = axios.create({
  baseURL: "https://api.clashofclans.com/v1",
});

// Attach Authorization header using an interceptor
cocApi.interceptors.request.use(
  (config) => {
    if (cocApiToken) {
      config.headers.Authorization = `Bearer ${cocApiToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

module.exports = cocApi;
