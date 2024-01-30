import { ButtonContainer } from './FormSwapButton.styles.ts';
import { FormType } from '@pages/Home/Home.types.ts';

type ComponentProps = {
  formType: FormType;
  buttonContent: string;
  onClick: (formType: FormType) => void;
}

const FormSwapButton = ({ formType, buttonContent, onClick }: ComponentProps) => {
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
