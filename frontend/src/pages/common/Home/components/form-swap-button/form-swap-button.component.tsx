import { Button } from './form-swap-button.styles';

import { FormType } from '../../home.types';

interface ComponentProps {
  readonly formType: FormType;
  readonly content: string;
  readonly clickHandler: (formType: FormType) => void;
  readonly isDisabled: boolean;
}

const FormSwapButton = ({ formType, content, clickHandler, isDisabled }: ComponentProps) => {
  return (
    <Button
      type={'button'}
      name={content}
      onClick={() => clickHandler(formType)}
      disabled={isDisabled}
    >
      {content}
    </Button>
  );
};

export default FormSwapButton;
