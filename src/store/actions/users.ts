import { api } from 'src/services/api';
import { User } from 'src/types';

export const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<User[], void>({
      query: () => ({ url: 'users' }),
    }),
    getUser: build.query<User, User['id']>({
      query: (id) => `users/${id}`,
      providesTags: (_post, _err, id) => [{ type: 'Users', id }],
    }),
    loginUser: build.query<User, User['id']>({
      query: (id) => `users/${id}`,
      providesTags: (_post, _err, id) => [{ type: 'Users', id }],
    }),
    updateUser: build.mutation<User, Partial<User>>({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `users/${id}`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: (post) => [{ type: 'Users', id: post?.id }],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetUsersQuery,
  useLoginUserQuery,
  useUpdateUserMutation,
} = usersApi;
