import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { StackList } from 'src/navigation';
import { useAppDispatch, useAppSelector } from 'src/store';
import { usersApi } from 'src/store/actions';

type FormValues = {
  email: string;
  password: string;
};

export type LoginScreenNavigationProp = StackNavigationProp<StackList, 'LogIn'>;

export function useLoginScreen() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const dispatch = useAppDispatch();

  const onSubmit = async (data: FormValues) => {
    await dispatch(usersApi.endpoints.loginUser.initiate(2));
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
