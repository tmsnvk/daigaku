import { ButtonContainer } from './FormSwapButton.styles.ts';
import { FormTypeT } from '@pages/Home/Home.types.ts';

type ComponentPropsT = {
  formType: FormTypeT;
  buttonContent: string;
  clickHandler: (formType: FormTypeT) => void;
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
