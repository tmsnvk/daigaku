import { InputField } from '@components/shared/form/index.ts';
import { MainContainer } from './Home.styles.ts';

const HomePage = () => {
  return (
    <MainContainer>
      <InputField
        id={'email'}
        labelContent={'Email'}
        type={'email'}
        placeholder={'Enter your email address...'}
      />
    </MainContainer>
  );
};

export default HomePage;
