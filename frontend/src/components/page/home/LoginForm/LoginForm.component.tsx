import { InputField } from '@components/shared/form';

const LoginForm = () => {
  return (
    <>
      <InputField
        id={'email'}
        labelContent={'Email'}
        type={'email'}
        placeholder={'Enter your email address...'}
      />
    </>
  );
};

export default LoginForm;
