import axios from 'axios';
import { getApiUrl } from '/src/config/apiConfig';

// Get API URL from environment and ensure it ends with /
let API = null;

const initAPI = async () => {
  if (!API) {
    API = await getApiUrl();
  }
  return API;
};

const ensureAPI = async () => {
  if (!API) {
    await initAPI();
  }
  return API;
};

// ! OLD REQUESTS, NEED TO REWORK OR DELETE
export const getUserById = async (user_id) => {
  try {
    const API = await ensureAPI();
    const response = await axios.get(API + 'users/' + user_id);
    console.log('Requset getUserById completed. Getted user: ', response.data);
    return response.data;
  } catch (error) {
    console.log('Something wrong, ' + error);
    throw error;
  }
};

// * WORKED WITH BACKEND REQUESTS
export const getUsers = async () => {
  try {
    const API = await ensureAPI();
    const response = await axios.get(API + 'users');

    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  } finally {
    console.log('Requset getUsers completed');
  }
};

export const login = async (userData) => {
  try {
    const API = await ensureAPI();
    const response = await axios.post(API + 'auth/login', {
      username: userData.username,
      password: userData.password,
    });

    return response.data;
  } catch (error) {
    console.log('Something wrong, ' + error);
    throw error;
  }
};

export const register = async (userData) => {
  try {
    const API = await ensureAPI();
    const response = await axios.post(API + 'auth/register', {
      username: userData.username,
      password: userData.password,
    });

    return response.data;
  } catch (error) {
    console.log('Something wrong, ' + error);
    throw error;
  }
};
