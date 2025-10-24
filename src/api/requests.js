import axios from 'axios';

const API = 'http://localhost:3000/';

export const getUsers = async () => {
  try {
    const response = await axios.get(API + 'users');
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  } finally {
    console.log('getUsers completed');
  }
};

export const getUserById = async (user_id) => {
  try {
    const response = await axios.get(API + 'users/' + user_id);
    return response.data;
  } catch (error) {
    console.log('Something wrong, ' + error);
    throw error;
  }
};

export const getUserByName = async (user_username) => {
  try {
    const response = await axios.get(API + 'users?username=' + user_username);
    return response.data[0];
  } catch (error) {
    console.log('Something wrong, ' + error);
  }
};

export const getLastUserId = async () => {
  try {
    const users = await getUsers();

    if (users.length === 0) {
      return 0;
    }

    const maxId = Math.max(...users.map((user) => user.id));
    return maxId;
  } catch (error) {
    console.log('Something wrong, ' + error);
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const responce = await axios.post(API + 'users', {
      username: userData.username,
      password: userData.password,
      isAdmin: false,
    });

    console.log('User created', responce.data);
    return responce.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
