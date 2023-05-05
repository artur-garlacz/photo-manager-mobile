import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { StackList } from 'src/navigation';
import { useAppDispatch, useAppSelector } from 'src/store';
import { useGetUsersQuery, usersApi } from 'src/store/actions';

type FormValues = {
  email: string;
  password: string;
};

// type LoginScreenNa

export type LoginScreenNavigationProp = StackNavigationProp<StackList, 'LogIn'>;

export function useLoginScreen() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { data: users } = useGetUsersQuery(); // JUST FOR DEMO
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const dispatch = useAppDispatch();

  const onSubmit = async (data: FormValues) => {
    console.log('users', users?.length);
    const user = users?.find((user) => user.email === data.email);
    const result = await dispatch(usersApi.endpoints.loginUser.initiate(2));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });
    }
  }, [isAuthenticated]);

  return {
    control,
    handleSubmit: handleSubmit(onSubmit),
  };
}
