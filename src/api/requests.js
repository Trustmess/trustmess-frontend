import axios from 'axios';

// const { VITE_API_URL: API } = import.meta.env;
const { VITE_FASTAPI_SERVER: API } = import.meta.env;

// ! OLD REQUESTS, NEED TO REWORK OR DELETE
export const getUserById = async (user_id) => {
  try {
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
