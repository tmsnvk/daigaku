/**
 * @prettier
 */

/* component, style imports */
import { Button } from './form-swap-button.styles';

/* interface, type, enum imports */
import { FormType } from '../../home.types';

/* interfaces, types, enums */
interface ComponentProps {
  readonly formType: FormType;
  readonly buttonLabel: string;
  readonly onFormSelect: (formType: FormType) => void;
  readonly isDisabled: boolean;
}

/*
 * component - TODO - add functionality description
 */
export const FormSwapButton = ({ formType, buttonLabel, onFormSelect, isDisabled }: ComponentProps) => {
  return (
    <Button
      type={'button'}
      id={buttonLabel}
      name={buttonLabel}
      onClick={() => onFormSelect(formType)}
      disabled={isDisabled}
    >
      {buttonLabel}
    </Button>
  );
};
