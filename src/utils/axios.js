import axios from 'axios';

import { CONFIG } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: CONFIG.serverUrl });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong!')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await axiosInstance.get(url, { ...config });

    return res.data;
  } catch (error) {
    console.error('Failed to fetch:', error);
    throw error;
  }
};

// ----------------------------------------------------------------------

export const endpoints = {
  auth: {
    // me: '/api/v1/auth/checkLogin',
    signIn: '/api/users/request-otp/',
    twoStep:'/api/users/verify-otp/',
    profileget:'/api/users/profile/',
    loanDetails:'api/customer_live/loan-detail/',
    // forgotPassword:'/api/v1/auth/forgot-password',
    // resetPassword: (token) =>`api/v1/auth/reset-password/${token}`,
    // validToken: (token) => `/api/v1/auth/validate-token/${token}`,
  },
};
