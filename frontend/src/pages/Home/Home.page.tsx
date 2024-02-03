import { ConfirmationModal } from '@components/shared/modal';
import {
  useRenderSelectedFormComponent,
  useShowConfirmationModal,
} from './Home.hooks.tsx';
import { confirmationModalMessages } from './Home.utilities.ts';
import { MainContainer } from './Home.styles.ts';

const HomePage = () => {
  const { isConfirmationModalVisible, showConfirmationModalAfterSuccessFulSubmission } = useShowConfirmationModal();
  const { activeFormType, renderFormComponent } = useRenderSelectedFormComponent({ showConfirmationModalAfterSuccessFulSubmission });

  return (
    <MainContainer>
      {renderFormComponent()}
      {isConfirmationModalVisible && <ConfirmationModal isVisible={isConfirmationModalVisible} message={confirmationModalMessages[activeFormType]} />}
    </MainContainer>
  );
};

export default HomePage;
