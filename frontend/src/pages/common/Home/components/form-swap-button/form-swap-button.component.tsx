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
  readonly content: string;
  readonly clickHandler: (formType: FormType) => void;
  readonly isDisabled: boolean;
}

/*
 * component - TODO - add functionality description
 */
export const FormSwapButton = ({ formType, content, clickHandler, isDisabled }: ComponentProps) => {
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
