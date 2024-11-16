/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

/* component, style imports */
import { Button } from './form-swap-button.styles';

/* interface, type, enum imports */
import { FormType } from '../../home.interfaces';

/**
 * ===============
 * Component {@link FormSwapButton}
 * ===============
 */

/**
 * Defines the component's properties.
 *
 * @since 0.0.1
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
 * The component is disabled while there are ongoing REST API requests.
 *
 * @param {ComponentProps} props
 * @return {JSX.Element}
 *
 * @since 0.0.1
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
