import axios from 'axios';
import { getApiUrl } from '/src/config/apiConfig';

// Get API URL from environment and ensure it ends with /
let API = null;
let axiosInstance = null;

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

const getAxiosInstance = async () => {
  if (!axiosInstance) {
    const apiUrl = await ensureAPI();
    axiosInstance = axios.create({
      baseURL: apiUrl,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  return axiosInstance;
};

// * WORKED WITH BACKEND REQUESTS
export const getUserById = async (user_id) => {
  try {
    const instance = await getAxiosInstance();
    const response = await instance.get('users/' + user_id);
    console.log('Requset getUserById completed. Getted user: ', response.data);
    return response.data;
  } catch (error) {
    console.log('Something wrong, ' + error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const instance = await getAxiosInstance();
    const response = await instance.get('users');

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
    const instance = await getAxiosInstance();
    const response = await instance.post('auth/login', {
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
    const instance = await getAxiosInstance();
    const response = await instance.post('auth/register', {
      username: userData.username,
      password: userData.password,
    });

    return response.data;
  } catch (error) {
    console.log('Something wrong, ' + error);
    throw error;
  }
};

export const deleteUser = async (username) => {
  try {
    const instance = await getAxiosInstance();
    const response = instance.post('auth/delete_user', {
      username: username,
    });
  } catch (error) {
    throw error;
  }
};
