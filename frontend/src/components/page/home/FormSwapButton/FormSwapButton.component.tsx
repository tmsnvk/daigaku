import { ButtonContainer } from './FormSwapButton.styles.ts';

type FormSwapButton = {
  formType: string;
  buttonContent: string;
  onClick: (buttonName: string) => void;
}

const FormSwapButton = ({ formType, buttonContent, onClick }: FormSwapButton) => {
  return (
    <ButtonContainer
      type={'button'}
      onClick={() => onClick(formType)}
    >
      {buttonContent}
    </ButtonContainer>
  );
};

export default FormSwapButton;
