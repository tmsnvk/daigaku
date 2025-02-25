/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

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
   * The method that is triggered when the button is clicked.
   */
  onFormSelect: (formType: FormType) => void;

  /**
   * The boolean indicating whether the button should be disabled or not.
   */
  readonly isDisabled: boolean;
}

/**
 * Manages the responsibility of switching between different {@link FormType} components.
 * The form selection is triggered when the component is clicked.
 * The component's button is disabled while there is a pending REST API request.
 *
 * @param {ComponentProps} props
 * @return {JSX.Element}
 */
export const FormSwapButton = ({ formType, buttonLabel, onFormSelect, isDisabled }: ComponentProps): JSX.Element => {
  return (
    <button
      id={buttonLabel}
      name={buttonLabel}
      className={`h-[5rem] px-[1.5rem] text-xl font-extrabold color-jacarta bg-columbia-blue rounded-(--small-border-radius) cursor-pointer
        focus:outline-[0.25rem] focus:outline-solid focus:outline-(--color-jacarta)
        hover:outline-[0.25rem] hover:outline-solid hover:outline-(--color-jacarta)
        disabled:cursor-not-allowed`}
      type={'button'}
      onClick={() => onFormSelect(formType)}
      disabled={isDisabled}
    >
      {buttonLabel}
    </button>
  );
};
