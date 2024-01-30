import {
  LoginForm,
} from '@components/page/home/index.ts';
import { MainContainer } from './Home.styles.ts';

const HomePage = () => {
  return (
    <MainContainer>
      <LoginForm />
    </MainContainer>
  );
};

export default HomePage;
