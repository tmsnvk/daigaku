import { Button } from './FormSwapButton.styles.ts';
import { FormTypeE } from '@pages/shared/Home/Home.types.ts';

type ComponentPropsT = {
  formType: FormTypeE;
  content: string;
  clickHandler: (formType: FormTypeE) => void;
  isDisabled: boolean;
}

const FormSwapButton = ({ formType, content, clickHandler, isDisabled }: ComponentPropsT) => {
  return (
    <Button
      type={'button'}
      onClick={() => clickHandler(formType)}
      disabled={isDisabled}
    >
      {content}
    </Button>
  );
};

export default FormSwapButton;
