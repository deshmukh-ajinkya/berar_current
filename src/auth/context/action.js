import axios, { endpoints } from 'src/utils/axios';

import { setSession } from './utils';


/** **************************************
 * Sign in
 *************************************** */
export const signInWithPassword = async ({ username }) => {
  try {
    const params = { username };
    const res = await axios.post(endpoints.auth.signIn, params);
    if (res.status !== 200) {
      throw new Error('Failed to request OTP');
    }
    return true;
  } catch (error) {
    console.error("❌ Error during OTP request:", error);
    throw error;
  }
};
export const verifyOtp = async ({ username, otp }) => {
  try {
    const params = { username, otp };
    const res = await axios.post(endpoints.auth.twoStep, params);
    if (res.status !== 200) {
      throw new Error('OTP verification failed');
    }
    const accesstoken  = res.data.access_token;
    const userData = res.data.user;
    await setSession(accesstoken,userData); // This already sets in sessionStorage
    return true;
  } catch (error) {
    console.error("❌ Error during OTP verification:", error);
    throw error;
  }
};

/** **************************************
 * reSend otp
 *************************************** */
export const resendSignUpCode = async ({ userId }) => {
  try {
    const params = { user_id:userId };
    console.log(params);
    const result = await axios.post(endpoints.auth.reSendOtp, params);
    if (!result) {
      throw new Error("Otp invalid");
    }
  } catch (error) {
    console.error('Error during otp send:', error);
    throw error;
  }
};
/** **************************************
 * Sign out
 *************************************** */
export const signOut = async () => {
  try {
   await setSession(null);
    // await setCookies(null,null);
  } catch (error) {
    console.error('Error during sign out:', error);
    throw error;
  }
};
/** **************************************
 * forgot Password
 *************************************** */
export const forgotPassword = async ({ userName }) => {
  const { data, error } = await axios.post(endpoints.auth.forgotPassword, { username: userName });
  // console.log(data)
  if (error) {
    console.error('sss:',error);
    throw error;
  }
  return { data, error };
};
/** **************************************
 * reset Password
 *************************************** */
export const resetPassword = async ({ resetToken, newPassword }) => {
  console.log('Sending data:', { resetToken, newPassword });
  try {
    const response = await axios.post(endpoints.auth.resetPassword(resetToken), {
      resetToken,
      newPassword,
    });
    console.log('Response:', response);
    return response.data;
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
};
/** **************************************
 * reset Password valid Token
 *************************************** */
export const validToken = async (token) => {
    try {
      const { data } = await axios.get(endpoints.auth.validToken(token));
      return data;
    } catch (error) {
      console.error('Error validating token:', error.response?.data || error.message);
      throw error;
    }
};
