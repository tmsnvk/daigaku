/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* component, style imports */
import { Button } from './form-swap-button.styles';

/* interface, type, enum imports */
import { FormType } from '../../home.models';

/**
 * Defines the component's properties.
 */
interface ComponentProps {
  /**
   * The type of the form to switch to.
   */
  readonly formType: FormType;

  /**
   * The button label to be displayed and used for identifying the button.
   */
  readonly buttonLabel: string;

  /**
   * A callback function that is triggered when the button is clicked.
   */
  readonly onFormSelect: (formType: FormType) => void;

  /**
   * A boolean indicating whether the button should be disabled or not.
   */
  readonly isDisabled: boolean;
}

/**
 * Manages the responsibility of switching between different {@link FormType}.
 * The form selection is triggered when the component is clicked.
 * The component is disabled while there is an ongoing REST API request.
 *
 * @param {ComponentProps} props
 * @return {JSX.Element}
 */
export const FormSwapButton = ({ formType, buttonLabel, onFormSelect, isDisabled }: ComponentProps): JSX.Element => {
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
