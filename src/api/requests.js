import axios from 'axios';

const { VITE_API_URL: API } = import.meta.env;

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

export const getUserByName = async (user_name) => {
  try {
    const response = await axios.get(API + 'users/?username=' + user_name);
    console.log('Requset getUserById completed. Getted user: ', response.data);
    return response.data;
  } catch (error) {
    console.log('Something wrong, ' + error);
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await axios.post(API + 'users', {
      username: userData.username,
      password: userData.password,
      isAdmin: false,
    });

    console.log('User created. New account', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
