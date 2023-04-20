import { SubmitHandler, useForm } from 'react-hook-form';
import { useGetUsersQuery } from 'src/store/actions';

type FormValues = {
  email: string;
  password: string;
};

export function useLoginScreen() {
  const { data: users } = useGetUsersQuery(); // JUST FOR DEMO
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return {
    control,
    handleSubmit: handleSubmit(onSubmit),
  };
}
