import { ConfirmationModal } from '@components/shared/modal';
import {
  useRenderSelectedFormComponent,
  useShowConfirmationModal,
} from './Home.hooks.tsx';
import { MainContainer } from './Home.styles.ts';
import { confirmationModalMessages } from './Home.utilities.ts';

const HomePage = () => {
  const { isConfirmationModalVisible, showModalAfterSuccessFulSubmission, closeModal } = useShowConfirmationModal();
  const { activeFormType, renderFormComponent } = useRenderSelectedFormComponent({ showModalAfterSuccessFulSubmission });

  return (
    <MainContainer>
      {renderFormComponent()}
      {
        isConfirmationModalVisible &&
        <ConfirmationModal
          isVisible={isConfirmationModalVisible}
          message={confirmationModalMessages[activeFormType]}
          closeModal={closeModal}
        />
      }
    </MainContainer>
  );
};

export default HomePage;
