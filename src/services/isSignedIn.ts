import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from 'src/types';

export function authService() {
  return {
    signIn: (userId: User['id']) => {
      AsyncStorage.setItem('userId', userId.toString());
    },
    signOut: () => {
      AsyncStorage.removeItem('userId');
    },
    getUserId: async () => {
      try {
        const user = await AsyncStorage.getItem('userId');

        if (!user) {
          throw new Error('User not found');
        }
        return user;
      } catch (e) {
        console.error(e);
      }
    },
  };
}
