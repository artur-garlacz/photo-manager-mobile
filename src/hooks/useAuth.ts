import { useQuery } from 'react-query';
import { usersApi } from 'src/api/actions/users';
import { authService } from 'src/services/isSignedIn';
import { User } from 'src/types';

export function useAuth() {
  const { data } = useQuery<User>('users', async () => {
    const userId = await authService().getUserId();

    return usersApi.getUser(Number(userId));
  });

  return { user: data };
}
