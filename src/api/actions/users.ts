import { fetcher } from 'src/api';
import { User } from 'src/types';

export const usersApi = {
  getUsers: () => {
    return fetcher({ method: 'GET', queryURL: 'users' });
  },
  getUser: (id: User['id']) => {
    return fetcher({ method: 'GET', queryURL: `users/${id}` });
  },
};
