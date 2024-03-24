import { ButtonContainer } from './FormSwapButton.styles.ts';
import { FormTypeE } from '@pages/shared/Home/Home.types.ts';

type ComponentPropsT = {
  formType: FormTypeE;
  buttonContent: string;
  clickHandler: (formType: FormTypeE) => void;
  isDisabled?: boolean;
}

const FormSwapButton = ({ formType, buttonContent, clickHandler, isDisabled }: ComponentPropsT) => {
  return (
    <ButtonContainer
      type={'button'}
      onClick={() => clickHandler(formType)}
      disabled={isDisabled}
    >
      {buttonContent}
    </ButtonContainer>
  );
};

export default FormSwapButton;
