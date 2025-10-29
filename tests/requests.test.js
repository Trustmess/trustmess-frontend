import { expect, it, describe, vi, beforeAll, beforeEach } from 'vitest';
import axios from 'axios';
const { VITE_API_URL: API } = import.meta.env;

vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

import { getUserById, getUserByName, getUsers, createUser } from '/src/api/requests';

describe('getUserById Get API request', () => {
  const fakeUser = {
    id: 1,
    username: 'testUser1',
    password: 'testPass1',
    isAdmin: true,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should get user info from db with id', async () => {
    axios.get.mockResolvedValue({ data: fakeUser });

    const result = await getUserById('1');

    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/users/1'));
    expect(result).toEqual(fakeUser);
  });
});

describe('getUserByName Get API request', () => {
  const fakeUserByName = {
    id: 1001,
    username: 'testUserByName',
    password: 'testPassByName',
    isAdmin: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should get user info from db with username', async () => {
    axios.get.mockResolvedValue({ data: fakeUserByName });

    const result = await getUserByName('testUserByName');

    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('users/?username='));
    expect(result).toEqual(fakeUserByName);
  });
});

describe('getUsers Get API request', () => {
  const fakeUsers = [
    {
      id: 1,
      username: 'testUser1',
      password: 'testUser1',
      isAdmin: true,
    },
    {
      id: 2,
      username: 'testUser2',
      password: 'testUser2',
      isAdmin: false,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return list of all users', async () => {
    axios.get.mockResolvedValue({ data: fakeUsers });

    const result = await getUsers();

    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/users'));
    expect(result).toEqual(fakeUsers);
  });
});

describe('createUser Post API request', () => {
  const fakeNewUser = {
    id: 1,
    username: 'newUser',
    password: 'newPassword',
    isAdmin: false,
  };

  const fakeUserData = {
    username: 'newUser',
    password: 'newPassword',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create new user and save in db', async () => {
    axios.post.mockResolvedValue({ data: fakeNewUser });

    const result = await createUser(fakeUserData);

    expect(axios.post).toHaveBeenCalledWith(expect.stringContaining('/users'), {
      username: 'newUser',
      password: 'newPassword',
      isAdmin: false,
    });
    expect(result).toEqual(fakeNewUser);
  });
});
