/**
 * @prettier
 */

/**
 * @fileoverview
 * @author tmsnvk
 *
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
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
 * The interface represents the component's properties.
 *
 * @since 0.0.1
 */
interface ComponentProps {
  readonly formType: FormType;
  readonly buttonLabel: string;
  readonly onFormSelect: (formType: FormType) => void;
  readonly isDisabled: boolean;
}

/**
 * @description
 * The component responsible for switching between different {@link FormType}.
 * The form selection is triggered when the component is clicked.
 * The component is disabled while there are ongoing REST API requests.
 *
 * @param {ComponentProps} props
 * @param props.formType The type of the form to switch to.
 * @param props.buttonLabel The button label to be displayed and used for identifying the button.
 * @param props.onFormSelect A callback function that is triggered when the button is clicked.
 * @param props.isDisabled A boolean indicating whether the button should be disabled or not.
 *
 * @returns {JSX.Element}
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
